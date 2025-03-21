# Music Vibe Project

## Overview

This project is a web application that allows users to upload their musics and get a vibe check on them. The application then extract music vibes and create a graphical representation to show the user how their music is perceived.

## Tech Stack

- **Next.js**: A React framework for building server-rendered applications.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Vercel**: A cloud platform for static sites and serverless functions.
- **React Force Graph**: Represent each music as a node in a graph and connect them with edges to show the relationship between different musics.
- **Prisma**: An ORM for Node.js and TypeScript that simplifies database access.
- **Neon**: A serverless Postgres database that allows for easy scaling and management.

## Development Setup

First, install the dependencies:

```
cd music-vibe
npm install
```

Set up the database (With Docker):

```bash
docker run --name music_vibe_db \
  -e POSTGRES_USER=music_user \
  -e POSTGRES_PASSWORD=music_password \
  -e POSTGRES_DB=music_vibe \
  -p 5432:5432 \
  -v music_vibe_data:/var/lib/postgresql/data \
  -d postgres:15
```

Set up development database:

```bash
npx prisma db push
```

Populate with mock data (Optional):

```bash
npx prisma db seed
```

Then, set up your environment variables. Copy the `.env.example` file to `.env.local` and fill in the required values.

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- [ ] Upload music files:
  - [ ] Music file upload: Upload single audio file to the server.
  - [x] Store metadata: Store metadata of the uploaded music in the Neon database.
- [x] Graph display: Create & display a graph connecting between musics and vibes.
- [x] Search: Search for musics by name or vibe keyword. Highlight the musics that match the search criteria in the graph.
- [ ] Advanced upload:
  - [ ] URL Upload: Allow user to enter a youtube link as an upload option.
  - [ ] Playlist Upload: Allow user to paste Youtube playlist URL, auto search for all musics in the playlist and add to the graph.
- [ ] Vibe Extraction: Use Gemini 2.0 Flash to extract vibes from the uploaded music/music URL.
