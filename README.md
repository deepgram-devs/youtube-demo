# Deepgram YouTube Demo

A Next.js based demo showing how you can transcribe a YouTube video using Deepgram.

[Try it out!](https://deepgram-youtube-demo.fly.dev)

![Deepgram YouTube Demo](/.github/title.png)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- [Sign up to Deepgram](https://console.deepgram.com/signup?utm_source=github&utm_campaign=dx-demos&utm_content=%2Fyoutube-demo) and get $200 free credit (enough for hundreds of hours of audio).
- Create a Deepgram API key.
- [Sign up to Supabase](https://supabase.com/dashboard/sign-up) and create a new project.
- Create a transcriptions database using [this table definition](./db/transcriptions.sql). **Row-level security is disabled, because there is no auth on the site.**
- Create a `.env.local` file based on [.env.local.example](./.env.local.example) using your supabase public URL, your supabase anon-key, and your DG api key.

## Starting the application

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

~~The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.~~

~~Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.~~

We can't currently deploy to Vercel, because we rely on tmpfs not available on Vercel deployments.
