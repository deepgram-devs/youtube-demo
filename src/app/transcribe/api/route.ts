import { createClient } from "@supabase/supabase-js";
import { Deepgram } from "@deepgram/sdk";
import { Features } from "@/context/transcription";
import { NextResponse } from "next/server";
import { ReadStreamSource } from "@deepgram/sdk/dist/types";
import fs from "fs";
import urlParser from "@/util/urlParser";
import ytdl from "ytdl-core";
import featureMap from "@/util/featureMap";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const dg = new Deepgram(
  process.env.DEEPGRAM_API_KEY as string,
  "llm.sandbox.deepgram.com"
);

export async function POST(request: Request) {
  const body: {
    source: { url: string };
    features: Features;
  } = await request.json();
  const { source, features } = body;

  const videoId = urlParser(source.url);
  const mp3FilePath = `/tmp/ytdl-${videoId}.mp3`;
  const stream = fs.createWriteStream(mp3FilePath);

  const getVideo = new Promise((resolve, reject) => {
    const fetch = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
      filter: "audioonly",
      quality: "highestaudio",
    });
    fetch.pipe(stream);
    fetch.on("end", async () => {
      const dgSource: ReadStreamSource = {
        stream: fs.createReadStream(mp3FilePath),
        mimetype: "audio/mp3",
      };

      const map = featureMap(features);
      map.push({ llm: 1 });
      map.push({ tag: "deeptube-demo" });

      const dgFeatures = Object.assign({}, ...map);

      try {
        const transcript = await dg.transcription.preRecorded(
          dgSource,
          dgFeatures
        );

        const data = {
          source,
          features,
          ...transcript,
        };

        const { error } = await supabase.from("transcriptions").insert({
          url: source.url,
          request_id: transcript.metadata.request_id,
          data,
          features,
        });

        if (error) throw new Error(error.message);

        resolve({ request_id: transcript.metadata.request_id });
      } catch (error) {
        if (error instanceof Error) {
          reject(error.message);
        }
      }
    });
  });

  return NextResponse.json(await getVideo);
}
