import { Deepgram } from "@deepgram/sdk";
import { FeatureMap, Features, FeaturesMap } from "@/context/transcription";
import { NextResponse } from "next/server";
import { ReadStreamSource } from "@deepgram/sdk/dist/types";
import fs from "fs";
import ytdl from "ytdl-core";

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

  const urlParser = (url: string) => {
    var regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      //error
    }
  };

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

      const featureMap = (features: Features): FeaturesMap => {
        return features.map((f, i): FeatureMap => ({ [f.key]: f.value }));
      };

      const map = featureMap(features);
      map.push({ llm: 1 });

      const dgFeatures = Object.assign({}, ...map);
      console.log(dgFeatures);

      const transcript = await dg.transcription.preRecorded(
        dgSource,
        dgFeatures
      );

      console.log(transcript);

      const responseObj = {
        transcript:
          transcript.results.channels[0]?.alternatives[0]?.transcript || null,
        summary: transcript.results?.summary?.short || null,
      };

      resolve(responseObj);
    });
  });

  return NextResponse.json(await getVideo);
}
