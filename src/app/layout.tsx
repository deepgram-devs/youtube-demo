import Brand from "@/components/Brand";
import Errors from "@/components/Errors";

import "./globals.css";
import { Inter } from "next/font/google";
import { TranscriptionContextProvider } from "@/context/transcription";
import { ErrorContextProvider } from "@/context/error";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Transcribe a YouTube video!",
  description: "A Next.js app, build by @lukeocodes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorContextProvider>
          <TranscriptionContextProvider>
            <main className="flex justify-center mt-20">
              <div className="w-[48em] gap-2">
                <Brand />
                <Errors />
                {/* <Progress /> */}
                <div className="min-h-[24em]">{children}</div>
              </div>
            </main>
          </TranscriptionContextProvider>
        </ErrorContextProvider>
      </body>
    </html>
  );
}
