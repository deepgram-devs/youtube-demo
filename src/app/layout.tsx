import Brand from "@/components/Brand";
import Errors from "@/components/Errors";

import "./globals.css";
import { Inter } from "next/font/google";
import { TranscriptionContextProvider } from "@/context/transcription";
import { ErrorContextProvider } from "@/context/error";
import {
  CodeBracketIcon,
  CodeBracketSquareIcon,
} from "@heroicons/react/24/outline";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Transcribe a YouTube video!",
  description: "A Deepgram Next.js Demo, build by @lukeocodes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-color-scheme="dark">
      <body className={`${inter.className} body`}>
        <ErrorContextProvider>
          <TranscriptionContextProvider>
            <main className="flex justify-center mt-20 mx-auto p-8 lg:p-4">
              <div className="w-[48em] gap-2">
                <Brand />
                <Errors />
                <div>{children}</div>
              </div>{" "}
            </main>
          </TranscriptionContextProvider>
        </ErrorContextProvider>
        <div className="absolute top-0 right-0">
          <a
            href="https://github.com/lukeocodes/deeptube"
            target="_blank"
            className="text-[#13ef95] flex p-4"
          >
            <CodeBracketSquareIcon className="w-6 mr-2" /> GitHub
          </a>
        </div>
      </body>
    </html>
  );
}
