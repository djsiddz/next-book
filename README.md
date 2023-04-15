# Next Book

What's the next book I should read? Your personal book collection management app, built using NextJS with Typescript.

## Tech Stack

- NextJS 13
- ReactJS 18
- React Bootstrap
- StorybookJS

## Project Scope

- Use TypeScript with NextJS & ReactJS to build a personal book collection management app.
- Allow adding your book collection, along with other reading details:
  - Reading Status: Read/In Progress/Not Started
  - Format: Physical Book, PDF, Kindle Edition
  - Purchase Details (Date, Store, Price, Gifted, etc)
  - Capture reading progress
  - Allow adding custom summary, when marking a book as completed
- Based on the data entered, it can show various stats
- The app can also randomly recommend a new book to start, if you are confused which one to pick up next.

Near Future Scope:

- Writing Tests
- Adding StorybookJS

## Pages

- Dashboard (/dashboard)
  - Currently Reading
  - Recently completed
  - Recently purchased/acquired
  - Stats
  - Add New Book
- My Collection
  - Filter options
- Add New Book
- Edit Book Details
  - Update Book reading progress
  - Capture Personal Notes or Book Summary or Review
- Login (/login)
- Forgot Password

## Templates

- Login Form
- Navigation
- List of Books (Cards Collection)
- List of Books (Tabular)
- Book Details Form (For Add & Edit pages)

## Organisms

- Book Profile (Individual Book Card)

## Molecules

- Hash Tags (aka Chips)
- Book Status Tags
- Book Name + Author Name

## Atoms

- Buttons
- Tags
- Book Cover Image
- Links
- User Profile Photo
- Input Field
- Label
- Text (Body, Header, Title Text can be created/controlled by CSS styling)

## Existing README Data

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
