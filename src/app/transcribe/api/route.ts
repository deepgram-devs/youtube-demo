import { NextResponse } from "next/server";
import { Deepgram } from "@deepgram/sdk";

import {
  PrerecordedTranscriptionOptions,
  TranscriptionSource,
} from "@deepgram/sdk/dist/types";

const dg = new Deepgram(process.env.DEEPGRAM_API_KEY as string);

export async function POST(request: Request) {
  const body: {
    source: TranscriptionSource;
    features: PrerecordedTranscriptionOptions;
  } = await request.json();

  const transcribe = await dg.transcription.preRecorded(
    body.source,
    body.features
  );

  console.log(transcribe);

  return NextResponse.json(transcribe);
}
