import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  // Clear existing data if needed
  await prisma.song.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.vibe.deleteMany();

  // Create vibes
  const vibes = await Promise.all([
    prisma.vibe.create({
      data: {
        name: 'Chill',
        description: 'Relaxing and mellow music',
        color: '#4A90E2',
      },
    }),
    prisma.vibe.create({
      data: {
        name: 'Energetic',
        description: 'High-energy music to get you pumped',
        color: '#E25B4A',
      },
    }),
    prisma.vibe.create({
      data: {
        name: 'Focused',
        description: 'Music for concentration and productivity',
        color: '#50E3C2',
      },
    }),
    prisma.vibe.create({
      data: {
        name: 'Melancholy',
        description: 'Thoughtful and emotional music',
        color: '#9B59B6',
      },
    }),
    prisma.vibe.create({
      data: {
        name: 'Uplifting',
        description: 'Music that elevates your mood',
        color: '#F39C12',
      },
    }),
    prisma.vibe.create({
      data: {
        name: 'Dreamy',
        description: 'Ethereal and atmospheric sounds',
        color: '#8E44AD',
      },
    }),
    prisma.vibe.create({
      data: {
        name: 'Intense',
        description: 'Powerful and dramatic compositions',
        color: '#C0392B',
      },
    }),
    prisma.vibe.create({
      data: {
        name: 'Jazzy',
        description: 'Smooth and sophisticated jazz vibes',
        color: '#7D3C98',
      },
    }),
    prisma.vibe.create({
      data: {
        name: 'Nostalgic',
        description: 'Music that brings back memories',
        color: '#2980B9',
      },
    }),
    prisma.vibe.create({
      data: {
        name: 'Experimental',
        description: 'Avant-garde and boundary-pushing music',
        color: '#1ABC9C',
      },
    }),
  ]);

  console.log('Created vibes:', vibes.map(v => v.name).join(', '));

  // Create artists with songs
  const artists = [
    // Original artists
    {
      name: 'Electric Dreams',
      imageUrl: 'https://example.com/artists/electric-dreams.jpg',
      songs: [
        { title: 'Neon Nights', duration: 244, vibes: ['Chill', 'Focused'] },
        { title: 'Digital Dawn', duration: 198, vibes: ['Energetic'] },
        { title: 'Cybernetic Sunset', duration: 275, vibes: ['Dreamy', 'Chill'] },
        { title: 'Virtual Reality', duration: 222, vibes: ['Experimental', 'Intense'] },
        { title: 'Binary Bliss', duration: 234, vibes: ['Uplifting', 'Energetic'] },
        { title: 'Circuit Breaker', duration: 198, vibes: ['Intense', 'Energetic'] },
        { title: 'Synth Symphony', duration: 315, vibes: ['Focused', 'Dreamy'] },
        { title: 'Pixel Paradise', duration: 241, vibes: ['Uplifting', 'Chill'] },
        { title: 'Digital Daydream', duration: 263, vibes: ['Dreamy', 'Experimental'] },
        { title: 'Electron Echo', duration: 218, vibes: ['Focused', 'Experimental'] },
      ]
    },
    {
      name: 'Ocean Waves',
      imageUrl: 'https://example.com/artists/ocean-waves.jpg',
      songs: [
        { title: 'Moonlit Shore', duration: 312, vibes: ['Melancholy', 'Chill'] },
        { title: 'Coastal Breeze', duration: 256, vibes: ['Chill'] },
        { title: 'Tidal Dreams', duration: 287, vibes: ['Dreamy', 'Chill'] },
        { title: 'Sea Whispers', duration: 298, vibes: ['Melancholy', 'Dreamy'] },
        { title: 'Deep Blue', duration: 325, vibes: ['Intense', 'Melancholy'] },
        { title: 'Coral Reef', duration: 268, vibes: ['Uplifting', 'Chill'] },
        { title: 'Island Morning', duration: 243, vibes: ['Uplifting', 'Nostalgic'] },
        { title: 'Stormy Waters', duration: 276, vibes: ['Intense', 'Experimental'] },
      ]
    },
    {
      name: 'Quantum Beat',
      imageUrl: 'https://example.com/artists/quantum-beat.jpg',
      songs: [
        { title: 'Particle Flow', duration: 224, vibes: ['Focused', 'Energetic'] },
        { title: 'Wave Function', duration: 272, vibes: ['Focused'] },
        { title: 'String Theory', duration: 246, vibes: ['Experimental', 'Intense'] },
        { title: 'Quantum Leap', duration: 208, vibes: ['Energetic', 'Uplifting'] },
        { title: 'Subatomic Dance', duration: 234, vibes: ['Energetic', 'Experimental'] },
        { title: 'Dark Matter', duration: 285, vibes: ['Intense', 'Melancholy'] },
        { title: 'Higgs Boson', duration: 223, vibes: ['Focused', 'Experimental'] },
        { title: 'Quantum Entanglement', duration: 267, vibes: ['Dreamy', 'Experimental'] },
        { title: 'Parallel Universe', duration: 312, vibes: ['Dreamy', 'Intense'] },
      ]
    },
    // New artists
    {
      name: 'Midnight Voyage',
      imageUrl: 'https://example.com/artists/midnight-voyage.jpg',
      songs: [
        { title: 'Starlight Cruise', duration: 286, vibes: ['Dreamy', 'Chill'] },
        { title: 'Cosmic Journey', duration: 327, vibes: ['Experimental', 'Dreamy'] },
        { title: 'Astral Projection', duration: 293, vibes: ['Experimental', 'Intense'] },
        { title: 'Nebula Drift', duration: 305, vibes: ['Chill', 'Dreamy'] },
        { title: 'Celestial Bodies', duration: 268, vibes: ['Uplifting', 'Dreamy'] },
        { title: 'Interstellar Overdrive', duration: 352, vibes: ['Intense', 'Experimental'] },
        { title: 'Lunar Phases', duration: 274, vibes: ['Melancholy', 'Dreamy'] },
        { title: 'Solar Winds', duration: 248, vibes: ['Chill', 'Uplifting'] },
      ]
    },
    {
      name: 'Urban Echoes',
      imageUrl: 'https://example.com/artists/urban-echoes.jpg',
      songs: [
        { title: 'City Lights', duration: 235, vibes: ['Energetic', 'Nostalgic'] },
        { title: 'Concrete Jungle', duration: 267, vibes: ['Intense', 'Energetic'] },
        { title: 'Neon District', duration: 248, vibes: ['Nostalgic', 'Chill'] },
        { title: 'Subway Dreams', duration: 219, vibes: ['Melancholy', 'Nostalgic'] },
        { title: 'Rooftop Views', duration: 258, vibes: ['Chill', 'Uplifting'] },
        { title: 'Urban Decay', duration: 273, vibes: ['Intense', 'Experimental'] },
        { title: 'Street Pulse', duration: 226, vibes: ['Energetic', 'Focused'] },
        { title: 'Skyscraper Shadows', duration: 288, vibes: ['Melancholy', 'Intense'] },
        { title: 'Downtown Dusk', duration: 245, vibes: ['Nostalgic', 'Chill'] },
      ]
    },
    {
      name: 'Velvet Harmony',
      imageUrl: 'https://example.com/artists/velvet-harmony.jpg',
      songs: [
        { title: 'Smooth Sensation', duration: 265, vibes: ['Jazzy', 'Chill'] },
        { title: 'Midnight Serenade', duration: 296, vibes: ['Jazzy', 'Melancholy'] },
        { title: 'Silken Notes', duration: 253, vibes: ['Jazzy', 'Uplifting'] },
        { title: 'Velvet Dreams', duration: 278, vibes: ['Dreamy', 'Jazzy'] },
        { title: 'Brass & Soul', duration: 243, vibes: ['Jazzy', 'Energetic'] },
        { title: 'Piano Whispers', duration: 284, vibes: ['Melancholy', 'Jazzy'] },
        { title: 'Saxophone Stories', duration: 308, vibes: ['Jazzy', 'Nostalgic'] },
        { title: 'Rhythm & Blues', duration: 237, vibes: ['Jazzy', 'Intense'] },
      ]
    },
    {
      name: 'Forest Reverie',
      imageUrl: 'https://example.com/artists/forest-reverie.jpg',
      songs: [
        { title: 'Woodland Whispers', duration: 318, vibes: ['Chill', 'Dreamy'] },
        { title: 'Ancient Pines', duration: 342, vibes: ['Nostalgic', 'Melancholy'] },
        { title: 'Rustling Leaves', duration: 276, vibes: ['Chill', 'Focused'] },
        { title: 'Misty Glade', duration: 295, vibes: ['Dreamy', 'Melancholy'] },
        { title: 'Forest Canopy', duration: 328, vibes: ['Uplifting', 'Dreamy'] },
        { title: 'Wild Streams', duration: 257, vibes: ['Energetic', 'Uplifting'] },
        { title: 'Fallen Log', duration: 289, vibes: ['Melancholy', 'Experimental'] },
        { title: 'Pinecone Path', duration: 264, vibes: ['Nostalgic', 'Chill'] },
      ]
    },
    {
      name: 'Digital Horizon',
      imageUrl: 'https://example.com/artists/digital-horizon.jpg',
      songs: [
        { title: 'Algorithm Groove', duration: 238, vibes: ['Focused', 'Energetic'] },
        { title: 'Data Stream', duration: 256, vibes: ['Experimental', 'Focused'] },
        { title: 'Neural Network', duration: 274, vibes: ['Energetic', 'Experimental'] },
        { title: 'Infinite Loop', duration: 312, vibes: ['Dreamy', 'Experimental'] },
        { title: 'Encryption Key', duration: 228, vibes: ['Intense', 'Focused'] },
        { title: 'Digital Detox', duration: 295, vibes: ['Chill', 'Melancholy'] },
        { title: 'Code Poetry', duration: 245, vibes: ['Focused', 'Uplifting'] },
        { title: 'Byte-sized Dreams', duration: 268, vibes: ['Dreamy', 'Nostalgic'] },
      ]
    },
    {
      name: 'Vintage Vinyl',
      imageUrl: 'https://example.com/artists/vintage-vinyl.jpg',
      songs: [
        { title: 'Analog Hearts', duration: 263, vibes: ['Nostalgic', 'Jazzy'] },
        { title: 'Record Crackle', duration: 289, vibes: ['Nostalgic', 'Chill'] },
        { title: 'Phonograph Blues', duration: 315, vibes: ['Melancholy', 'Jazzy'] },
        { title: 'Cassette Memories', duration: 247, vibes: ['Nostalgic', 'Dreamy'] },
        { title: 'Turntable Dreams', duration: 274, vibes: ['Jazzy', 'Uplifting'] },
        { title: 'B-Side Stories', duration: 253, vibes: ['Nostalgic', 'Melancholy'] },
        { title: 'Vinyl Revival', duration: 238, vibes: ['Energetic', 'Nostalgic'] },
        { title: 'Radio Waves', duration: 281, vibes: ['Nostalgic', 'Uplifting'] },
      ]
    },
    {
      name: 'Aurora Borealis',
      imageUrl: 'https://example.com/artists/aurora-borealis.jpg',
      songs: [
        { title: 'Northern Lights', duration: 347, vibes: ['Dreamy', 'Intense'] },
        { title: 'Polar Skies', duration: 328, vibes: ['Chill', 'Dreamy'] },
        { title: 'Frozen Echoes', duration: 296, vibes: ['Melancholy', 'Experimental'] },
        { title: 'Arctic Winds', duration: 318, vibes: ['Intense', 'Dreamy'] },
        { title: 'Ice Crystal', duration: 275, vibes: ['Chill', 'Focused'] },
        { title: 'Glacial Movement', duration: 356, vibes: ['Experimental', 'Melancholy'] },
        { title: 'Winter Solstice', duration: 308, vibes: ['Melancholy', 'Dreamy'] },
        { title: 'Midnight Sun', duration: 284, vibes: ['Uplifting', 'Dreamy'] },
      ]
    },
  ];

  // Create all artists with their songs
  for (const artistData of artists) {
    const { songs, ...artistInfo } = artistData;
    
    const artist = await prisma.artist.create({
      data: {
        ...artistInfo,
      },
    });
    
    // Create songs for each artist
    for (const songData of songs) {
      await prisma.song.create({
        data: {
          title: songData.title,
          duration: songData.duration,
          artistId: artist.id,
          vibes: {
            connect: songData.vibes.map(vibe => ({ name: vibe })),
          },
        },
      });
    }
  }

  console.log('Database seeded successfully! Created approximately 100 songs.');
  
  // Count and print summary
  const artistCount = await prisma.artist.count();
  const songCount = await prisma.song.count();
  const vibeCount = await prisma.vibe.count();
  
  console.log(`Created ${artistCount} artists, ${songCount} songs, and ${vibeCount} vibes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });