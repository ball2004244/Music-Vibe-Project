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
  ]);

  console.log('Created vibes:', vibes.map(v => v.name).join(', '));

  // Create artists with songs
  const artist1 = await prisma.artist.create({
    data: {
      name: 'Electric Dreams',
      imageUrl: 'https://example.com/artists/electric-dreams.jpg',
      songs: {
        create: [
          {
            title: 'Neon Nights',
            duration: 244, // 4:04
            vibes: {
              connect: [{ name: 'Chill' }, { name: 'Focused' }],
            },
          },
          {
            title: 'Digital Dawn',
            duration: 198, // 3:18
            vibes: {
              connect: [{ name: 'Energetic' }],
            },
          },
        ],
      },
    },
  });

  const artist2 = await prisma.artist.create({
    data: {
      name: 'Ocean Waves',
      imageUrl: 'https://example.com/artists/ocean-waves.jpg',
      songs: {
        create: [
          {
            title: 'Moonlit Shore',
            duration: 312, // 5:12
            vibes: {
              connect: [{ name: 'Melancholy' }, { name: 'Chill' }],
            },
          },
          {
            title: 'Coastal Breeze',
            duration: 256, // 4:16
            vibes: {
              connect: [{ name: 'Chill' }],
            },
          },
        ],
      },
    },
  });

  const artist3 = await prisma.artist.create({
    data: {
      name: 'Quantum Beat',
      imageUrl: 'https://example.com/artists/quantum-beat.jpg',
      songs: {
        create: [
          {
            title: 'Particle Flow',
            duration: 224, // 3:44
            vibes: {
              connect: [{ name: 'Focused' }, { name: 'Energetic' }],
            },
          },
          {
            title: 'Wave Function',
            duration: 272, // 4:32
            vibes: {
              connect: [{ name: 'Focused' }],
            },
          },
        ],
      },
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });