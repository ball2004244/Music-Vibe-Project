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

## Getting Started

First, install the dependencies:
```
cd music-vibe
npm install
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
    - [ ] Store metadata: Store metadata of the uploaded music in the Neon database.
- [ ] Graph display: Create & display a graph connecting between musics and vibes.
- [ ] Search: Search for musics by name or vibe keyword. Highlight the musics that match the search criteria in the graph.
- [ ] Advanced upload: 
    - [ ] URL Upload: Allow user to enter a youtube link as an upload option.
    - [ ] Playlist Upload: Allow user to paste Youtube playlist URL, auto search for all musics in the playlist and add to the graph.
