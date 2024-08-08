import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialMovies = [
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    year: 1994,
    directedBy: "Frank Darabont",
    rating: 9,
    genre: ["Drama"],
    imageUrl:
      "https://a.ltrbxd.com/resized/sm/upload/7l/hn/46/uz/zGINvGjdlO6TJRu9wESQvWlOKVT-0-1000-0-1500-crop.jpg?v=8736d1c395",
  },
  {
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    year: 1972,
    directedBy: "Francis Ford Coppola",
    rating: 9,
    genre: ["Crime", "Drama"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/8/1/8/51818-the-godfather-0-1000-0-1500-crop.jpg?v=bca8b67402",
  },
  {
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    year: 2008,
    directedBy: "Christopher Nolan",
    rating: 9,
    genre: ["Action", "Crime", "Drama"],
    imageUrl:
      "https://a.ltrbxd.com/resized/sm/upload/78/y5/zg/ej/oefdD26aey8GPdx7Rm45PNncJdU-0-1000-0-1500-crop.jpg?v=2d0ce4be25",
  },
  {
    title: "12 Angry Men",
    description:
      "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
    year: 1957,
    directedBy: "Sidney Lumet",
    rating: 9,
    genre: ["Drama"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/7/0/0/51700-12-angry-men-0-1000-0-1500-crop.jpg?v=b8aaf291a9",
  },
  {
    title: "Schindler's List",
    description:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    year: 1993,
    directedBy: "Steven Spielberg",
    rating: 9,
    genre: ["Biography", "Drama", "History"],
    imageUrl:
      "https://a.ltrbxd.com/resized/sm/upload/bz/1x/em/jr/yPisjyLweCl1tbgwgtzBCNCBle-0-1000-0-1500-crop.jpg?v=ca5215c5a9",
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    year: 2003,
    directedBy: "Peter Jackson",
    rating: 9,
    genre: ["Action", "Adventure", "Drama"],
    imageUrl:
      "https://a.ltrbxd.com/resized/sm/upload/3t/vq/0u/m6/1tX9ZlgVvWjAQhMs1vAfsYpi7VK-0-1000-0-1500-crop.jpg?v=30bbb824e1",
  },
  {
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    year: 1994,
    directedBy: "Quentin Tarantino",
    rating: 8,
    genre: ["Crime", "Drama"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/4/4/4/51444-pulp-fiction-0-1000-0-1500-crop.jpg?v=dee19a8077",
  },
  {
    title: "The Good, the Bad and the Ugly",
    description:
      "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
    year: 1966,
    directedBy: "Sergio Leone",
    rating: 8,
    genre: ["Western"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/6/6/6/51666-the-good-the-bad-and-the-ugly-0-1000-0-1500-crop.jpg?v=9474a84e63",
  },
  {
    title: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    year: 1999,
    directedBy: "David Fincher",
    rating: 8,
    genre: ["Drama"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/5/6/8/51568-fight-club-0-1000-0-1500-crop.jpg?v=768b32dfa4",
  },
  {
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    year: 1994,
    directedBy: "Robert Zemeckis",
    rating: 8,
    genre: ["Drama", "Romance"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/2/7/0/4/2704-forrest-gump-0-1000-0-1500-crop.jpg?v=173bc04cf0",
  },
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    year: 2010,
    directedBy: "Christopher Nolan",
    rating: 8,
    genre: ["Action", "Adventure", "Sci-Fi"],
    imageUrl:
      "https://a.ltrbxd.com/resized/sm/upload/sv/95/s9/4j/inception-0-1000-0-1500-crop.jpg?v=30d7224316",
  },
  {
    title: "The Matrix",
    description:
      "A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity.",
    year: 1999,
    directedBy: "Lana Wachowski, Lilly Wachowski",
    rating: 8,
    genre: ["Action", "Sci-Fi"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/5/1/8/51518-the-matrix-0-1000-0-1500-crop.jpg?v=fc7c366afe",
  },
  {
    title: "Goodfellas",
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    year: 1990,
    directedBy: "Martin Scorsese",
    rating: 8,
    genre: ["Biography", "Crime", "Drama"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/3/8/3/51383-goodfellas-0-1000-0-1500-crop.jpg?v=c6c265f228",
  },
  {
    title: "One Flew Over the Cuckoo's Nest",
    description:
      "A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies up the scared patients.",
    year: 1975,
    directedBy: "Milos Forman",
    rating: 8,
    genre: ["Drama"],
    imageUrl:
      "https://a.ltrbxd.com/resized/sm/upload/lf/ry/hy/2e/RHteRHXqym9f0gI4cmChbFOxD-0-1000-0-1500-crop.jpg?v=1e6a37509a",
  },
  {
    title: "Seven Samurai",
    description:
      "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.",
    year: 1954,
    directedBy: "Akira Kurosawa",
    rating: 8,
    genre: ["Action", "Adventure", "Drama"],
    imageUrl: "",
  },
  {
    title: "Se7en",
    description:
      "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    year: 1995,
    directedBy: "David Fincher",
    rating: 8,
    genre: ["Crime", "Drama", "Mystery"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/3/4/5/51345-se7en-0-1000-0-1500-crop.jpg?v=76a14ef6b4",
  },
  {
    title: "The Silence of the Lambs",
    description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    year: 1991,
    directedBy: "Jonathan Demme",
    rating: 8,
    genre: ["Crime", "Drama", "Thriller"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/7/8/2/51782-the-silence-of-the-lambs-0-1000-0-1500-crop.jpg?v=18d88bdff4",
  },
  {
    title: "City of God",
    description:
      "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.",
    year: 2002,
    directedBy: "Fernando Meirelles, Kátia Lund",
    rating: 8,
    genre: ["Crime", "Drama"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/5/2/3/51523-city-of-god-0-1000-0-1500-crop.jpg?v=7517ea94ce",
  },
  {
    title: "Life Is Beautiful",
    description:
      "When an open-minded Jewish librarian and his son become victims of the Holocaust, he uses a perfect mixture of will, humor, and imagination to protect his son from the dangers around their camp.",
    year: 1997,
    directedBy: "Roberto Benigni",
    rating: 8,
    genre: ["Comedy", "Drama", "Romance"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/4/8/7/51487-life-is-beautiful-0-1000-0-1500-crop.jpg?v=90ed0e667e",
  },
  {
    title: "Spirited Away",
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    year: 2001,
    directedBy: "Hayao Miyazaki",
    rating: 8,
    genre: ["Animation", "Adventure", "Family"],
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/5/1/9/2/1/51921-spirited-away-0-1000-0-1500-crop.jpg?v=a3ad463c55",
  },
];
const movieYaps = [
  {
    yap: "A timeless classic that never fails to inspire.",
    filmTitle: "The Shawshank Redemption",
  },
  {
    yap: "Marlon Brando's performance is unforgettable.",
    filmTitle: "The Godfather",
  },
  // ... more yaps ...
];
async function main() {
  // Find the existing user
  const user = await prisma.user.findUnique({
    where: {
      clerkId: "user_2kFgS7bD3Gn9vHjaHXoWxPGdaI4",
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  // Create a profile for the existing user if it doesn't exist
  let profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        name: "Test User",
        userId: user.id,
      },
    });
  }
  // Update movies with imageUrl
  for (const movie of initialMovies) {
    await prisma.film.updateMany({
      where: { title: movie.title },
      data: { imageUrl: movie.imageUrl },
    });
  }
  console.log("Movies updated with imageUrl.");
  console.log("Seeding finished.");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
