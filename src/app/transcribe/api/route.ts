import { NextResponse } from "next/server";
import { Deepgram } from "@deepgram/sdk";

import {
  PrerecordedTranscriptionOptions,
  TranscriptionSource,
} from "@deepgram/sdk/dist/types";

const dg = new Deepgram("3c2a5c10396787b3468cd29bd3887190e2a45f59");

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
