# Next Book

What's the next book I should read?

Your personal book collection management app, built using NextJS with Typescript.

## Learning Objectives

TBD

### Tech Stack

- NextJS 14 - App Structure ✅
- ReactJS 18 ✅
- TailwindCSS ✅
- TypeScript ✅
- Components from ShadCN UI ✅
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

## Project Structure

### Pages

- Dashboard (/dashboard)
  - Currently Reading
  - Recently completed
  - Recently purchased/acquired
  - Stats
  - Add New Book
- My Collection (/dashboard/collection)
  - Filter options
- Add New Book (This can be a modal instead of a page)
- Edit Book Details (/dashboard/collection/:id/edit)
  - Update Book reading progress
  - Capture Personal Notes or Book Summary or Review
- Login (/login)
- Forgot Password (/reset-password)

### Templates

- Login Form
- Navigation ✅
- List of Books (Cards Collection)
- List of Books (Tabular)
- Book Details Form (For Add & Edit pages)

### Organisms

- Book Profile (Individual Book Card)

### Molecules

- Hash Tags (aka Chips)
- Book Status Tags
- Book Name + Author Name

### Atoms

- Buttons ✅
- Tags
- Book Cover Image
- Links
- User Profile Photo
- Input Field
- Label
- Text (Body, Header, Title Text can be created/controlled by CSS styling)

## Deployed on Vercel

Link (Coming Soon)
