import Brand from "@/components/Brand";
import Errors from "@/components/Errors";

import "./globals.css";
import { Inter } from "next/font/google";
import { TranscriptionContextProvider } from "@/context/transcription";
import { ErrorContextProvider } from "@/context/error";
import {
  CodeBracketIcon,
  CodeBracketSquareIcon,
  SparklesIcon,
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
        <div className="mx-auto flex flex-row-reverse max-w-screen-xl">
          <a
            href="https://console.deepgram.com/signup?jump=keys&utm_source=github&utm_campaign=dx-demos&utm_content=youtube-demo"
            target="_blank"
            className="text-[#13ef95] flex p-4"
          >
            <SparklesIcon className="w-6 h-6 mr-2" />
            <span>Free API Key</span>
          </a>
          <a
            href="https://github.com/lukeocodes/deeptube"
            target="_blank"
            className="text-white flex p-4"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span>See the code</span>
          </a>
        </div>
        <ErrorContextProvider>
          <TranscriptionContextProvider>
            <main className="flex justify-center mt-20 mx-auto p-8 lg:p-4">
              <div className="w-[48em] gap-2">
                <Brand />
                <Errors />
                <div>{children}</div>
              </div>
            </main>
          </TranscriptionContextProvider>
        </ErrorContextProvider>
      </body>
    </html>
  );
}
