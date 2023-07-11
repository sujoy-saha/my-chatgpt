# Build a ChatGPT application with Next.js, NextAuth.js, TypeScript, Okta and Azure OpenAI Service

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It's using Okta as a login provider using Typescript and NextAuth.js. The solution is utilizing the Vercel AI SDK for the client components and invoking the Azure OpenAI service for the server components.   

Please refere the following resources to understand more details about the different components of this project. 

- [Build a Next.js Application with TypeScript and Okta](https://developer.okta.com/blog/2020/11/13/nextjs-typescript)
- [Next.js Authentication with Okta and NextAuth.js](https://thetombomb.com/posts/nextjs-nextauth-okta)
- [Vercel AI SDK](https://sdk.vercel.ai/docs/guides/openai)
- [Get started using GPT-35-Turbo with Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/chatgpt-quickstart?tabs=command-line&pivots=programming-language-javascript)


## Getting Started

Clone the repository:

```bash
git clone https://github.com/sujoy-saha/my-chatgpt.git
cd my-chatgpt
```

Get all the dependencies:

```bash
npm install
```

Set-up configuration:

Create a `.env.local` in the root directory and add the following configuration details.

```bash
NEXTAUTH_URL = "http://localhost:3000"

OKTA_OAUTH2_CLIENT_ID = "Replace with your Okta client ID"
OKTA_OAUTH2_CLIENT_SECRET = "Replace with your Okta client secret"
OKTA_OAUTH2_ISSUER = "Replace with your Okta Issuer details"
SECRET = "Replace with the secret"

AZURE_OPENAI_ENDPOINT = 'Replace with your Azure OpenAI Endpoint'
AZURE_OPENAI_KEY = 'Replace with you Azure OpenAI Key'
AZURE_OPENAI_MODEL = 'Replace with your OpenAI Model'
```

Run the application:

```bash
npm run dev
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

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.