import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  // Clear all tables and reset sequences
  await prisma.$queryRaw`TRUNCATE "_MovieToWatchlist", reviews, watchlists, movies, users RESTART IDENTITY CASCADE;`;

  // ── Users ────────────────────────────────────────────────────────────────────
  const usersData = [
    { email: 'admin@gmail.com', password: 'admin1234', role: 'ADMIN' },
    { email: 'alice@gmail.com', password: 'alice1234', role: 'MEMBER' },
    { email: 'bob@gmail.com', password: 'bob1234', role: 'MEMBER' },
  ];

  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
      },
    });
    users.push(user);
    console.log(`Created user: ${user.email} (${user.role})`);
  }

  const [adminUser, aliceUser, bobUser] = users;

  // ── Movies ───────────────────────────────────────────────────────────────────
  const moviesData = [
    {
      title: 'Get Out',
      director: 'Jordan Peele',
      genre: 'Crime',
      rating: 'NC-17',
      runtime: 104,
      yearOfRelease: 2017,
    },
    {
      title: 'The Conjuring',
      director: 'James Wan',
      genre: 'Horror',
      rating: 'R',
      runtime: 111,
      yearOfRelease: 2013,
    },
    {
      title: 'Air',
      director: 'Ben Affleck',
      genre: 'Sport',
      rating: 'R',
      runtime: 112,
      yearOfRelease: 2023,
    },
    {
      title: 'Spider-Man: Far From Home',
      director: 'Jon Watts',
      genre: 'Action',
      rating: 'PG-13',
      runtime: 130,
      yearOfRelease: 2019,
    },
    {
      title: 'Detective Pikachu',
      director: 'Rob Letterman',
      genre: 'Animation',
      rating: 'PG',
      runtime: 104,
      yearOfRelease: 2019,
    },
    {
      title: 'Inception',
      director: 'Christopher Nolan',
      genre: 'Sci-Fi',
      rating: 'PG-13',
      runtime: 148,
      yearOfRelease: 2010,
    },
  ];

  const movies = [];

  for (const movieData of moviesData) {
    const movie = await prisma.movie.create({ data: movieData });
    movies.push(movie);
  }
  console.log(`Created ${movies.length} movies`);

  // ── Watchlists ───────────────────────────────────────────────────────────────
  await prisma.watchlist.create({
    data: {
      watchlistName: 'Romance Moods',
      userId: aliceUser.id,
      movies: {
        connect: [{ id: movies[0].id }, { id: movies[3].id }],
      },
    },
  });

  await prisma.watchlist.create({
    data: {
      watchlistName: 'Weekend Picks',
      userId: bobUser.id,
      movies: {
        connect: [
          { id: movies[2].id },
          { id: movies[4].id },
          { id: movies[5].id },
        ],
      },
    },
  });

  await prisma.watchlist.create({
    data: {
      watchlistName: 'Admin Favourites',
      userId: adminUser.id,
      movies: {
        connect: [{ id: movies[1].id }, { id: movies[5].id }],
      },
    },
  });
  // ── Reviews ──────────────────────────────────────────────────────────────────
  await prisma.review.createMany({
    data: [
      {
        title: 'Scary Film!',
        description: 'I would not advise watching during the night time.',
        starRating: 6.5,
        movieId: movies[0].id,
        userId: aliceUser.id,
      },
      {
        title: 'Classic Nolan',
        description:
          'Mind-bending plot that keeps you guessing until the very end.',
        starRating: 9.0,
        movieId: movies[5].id,
        userId: aliceUser.id,
      },
      {
        title: 'Great Sports Drama',
        description:
          'Surprisingly emotional — Ben Affleck delivers a strong performance.',
        starRating: 7.5,
        movieId: movies[2].id,
        userId: bobUser.id,
      },
      {
        title: 'Fun for all ages',
        description: 'Pikachu is adorable. Perfect family movie night pick.',
        starRating: 8.0,
        movieId: movies[4].id,
        userId: bobUser.id,
      },
      {
        title: 'Admin Pick',
        description: 'The Conjuring is a must-watch for any horror fan.',
        starRating: 9.5,
        movieId: movies[1].id,
        userId: adminUser.id,
      },
    ],
  });
} catch (error) {
  console.error('Seed failed:', error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
