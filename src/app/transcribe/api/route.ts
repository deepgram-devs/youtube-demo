import { NextResponse } from "next/server";
import { Deepgram } from "@deepgram/sdk";
import fs from "fs";
import ytdl from "ytdl-core";

import {
  PrerecordedTranscriptionOptions,
  ReadStreamSource,
  TranscriptionSource,
} from "@deepgram/sdk/dist/types";

const dg = new Deepgram(process.env.DEEPGRAM_API_KEY as string);

export async function POST(request: Request) {
  const body: {
    source: { url: string };
    features: PrerecordedTranscriptionOptions;
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
  const stream = fs.createWriteStream(`/tmp/ytdl-${videoId}.mp4`);

  const getVideo = new Promise((resolve, reject) => {
    const fetch = ytdl(`https://www.youtube.com/watch?v=${videoId}`);
    fetch.pipe(stream);
    fetch.on("end", async () => {
      const dgSource: ReadStreamSource = {
        stream: fs.createReadStream(`/tmp/ytdl-${videoId}.mp4`),
        mimetype: "video/mp4",
      };

      const transcribe = await dg.transcription.preRecorded(dgSource, features);

      resolve(transcribe);
    });
  });

  return NextResponse.json(await getVideo);
}
