import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const movieArray = [
    {
        title: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
        year: 2010,
        directedBy: 'Christopher Nolan',
        genre: ['Action', 'Sci-Fi', 'Thriller'],
        rating: 8,
        imageUrl: 'https://a.ltrbxd.com/resized/sm/upload/sv/95/s9/4j/inception-0-1000-0-1500-crop.jpg?v=30d7224316'
    },
    {
        title: 'The Matrix',
        description: 'A computer hacker learns about the true nature of his reality and his role in the war against its controllers.',
        year: 1999,
        directedBy: 'Lana Wachowski, Lilly Wachowski',
        genre: ['Action', 'Sci-Fi'],
        rating: 9,
        imageUrl: 'https://a.ltrbxd.com/resized/film-poster/5/1/5/1/8/51518-the-matrix-0-1000-0-1500-crop.jpg?v=fc7c366afe'
    },
    {
        title: 'The Shawshank Redemption',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        year: 1994,
        directedBy: 'Frank Darabont',
        genre: ['Drama'],
        rating: 9,
        imageUrl: 'https://a.ltrbxd.com/resized/sm/upload/7l/hn/46/uz/zGINvGjdlO6TJRu9wESQvWlOKVT-0-1000-0-1500-crop.jpg?v=8736d1c395'
    },
    {
        title: 'The Godfather',
        description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        year: 1972,
        directedBy: 'Francis Ford Coppola',
        genre: ['Crime', 'Drama'],
        rating: 9,
        imageUrl: 'https://a.ltrbxd.com/resized/film-poster/5/1/8/1/8/51818-the-godfather-0-1000-0-1500-crop.jpg?v=bca8b67402'
    },
    {
        title: 'The Dark Knight',
        description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
        year: 2008,
        directedBy: 'Christopher Nolan',
        genre: ['Action', 'Crime', 'Drama'],
        rating: 9,
        imageUrl: 'https://a.ltrbxd.com/resized/sm/upload/78/y5/zg/ej/oefdD26aey8GPdx7Rm45PNncJdU-0-1000-0-1500-crop.jpg?v=2d0ce4be25'
    },
    {
        title: 'Pulp Fiction',
        description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
        year: 1994,
        directedBy: 'Quentin Tarantino',
        genre: ['Crime', 'Drama'],
        rating: 9,
        imageUrl: 'https://a.ltrbxd.com/resized/film-poster/5/1/4/4/4/51444-pulp-fiction-0-1000-0-1500-crop.jpg?v=dee19a8077'
    },
    {
        title: 'Fight Club',
        description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club.',
        year: 1999,
        directedBy: 'David Fincher',
        genre: ['Drama'],
        rating: 8,
        imageUrl: 'https://a.ltrbxd.com/resized/film-poster/5/1/5/6/8/51568-fight-club-0-1000-0-1500-crop.jpg?v=768b32dfa4'
    },
    {
        title: 'Forrest Gump',
        description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other history unfold through the perspective of an Alabama man.',
        year: 1994,
        directedBy: 'Robert Zemeckis',
        genre: ['Drama', 'Romance'],
        rating: 8,
        imageUrl: 'https://a.ltrbxd.com/resized/film-poster/2/7/0/4/2704-forrest-gump-0-1000-0-1500-crop.jpg?v=173bc04cf0'
    },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring.',
        year: 2001,
        directedBy: 'Peter Jackson',
        genre: ['Action', 'Adventure', 'Drama'],
        rating: 9,
        imageUrl: 'https://a.ltrbxd.com/resized/sm/upload/3t/vq/0u/m6/1tX9ZlgVvWjAQhMs1vAfsYpi7VK-0-1000-0-1500-crop.jpg?v=30bbb824e1'
    },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy.',
        year: 1977,
        directedBy: 'George Lucas',
        genre: ['Action', 'Adventure', 'Fantasy'],
        rating: 8,
        imageUrl: 'https://a.ltrbxd.com/resized/film-poster/2/7/0/6/2706-star-wars-0-1000-0-1500-crop.jpg?v=f1f1271bf5'
    },
    {
        title: 'The Silence of the Lambs',
        description: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer.',
        year: 1991,
        directedBy: 'Jonathan Demme',
        genre: ['Crime', 'Drama', 'Thriller'],
        rating: 9,
        imageUrl: 'https://a.ltrbxd.com/resized/film-poster/5/1/7/8/2/51782-the-silence-of-the-lambs-0-1000-0-1500-crop.jpg?v=18d88bdff4'
    },
    {
        title: 'Schindler\'s List',
        description: 'In German-occupied Poland during World War II, industrialist Oskar Schindler saves his Jewish employees.',
        year: 1993,
        directedBy: 'Steven Spielberg',
        genre: ['Biography', 'Drama', 'History'],
        rating: 9,
        imageUrl: 'https://a.ltrbxd.com/resized/sm/upload/bz/1x/em/jr/yPisjyLweCl1tbgwgtzBCNCBle-0-1000-0-1500-crop.jpg?v=ca5215c5a9'
    },
    {
        title: 'The Departed',
        description: 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in Boston.',
        year: 2006,
        directedBy: 'Martin Scorsese',
        genre: ['Crime', 'Drama', 'Thriller'],
        rating: 9,
        imageUrl: 'https://a.ltrbxd.com/resized/sm/upload/jr/th/pu/pb/laefkgrfa3oKwvBtWTBtf2suiI4-0-1000-0-1500-crop.jpg?v=f5d8231026'
    },
    {
        title: 'Gladiator',
        description: 'A former Roman General sets out to exact vengeance against the corrupt emperor.',
        year: 2000,
        directedBy: 'Ridley Scott',
        genre: ['Action', 'Adventure', 'Drama'],
        rating: 8,
        imageUrl: 'https://a.ltrbxd.com/resized/film-poster/5/1/9/5/2/51952-gladiator-0-1000-0-1500-crop.jpg?v=ebc9155e73'
    },
    {
        title: 'Titanic',
        description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist.',
        year: 1997,
        directedBy: 'James Cameron',
        genre: ['Drama', 'Romance'],
        rating: 7,
        imageUrl: 'https://a.ltrbxd.com/resized/film-poster/5/1/5/2/4/51524-titanic-0-1000-0-1500-crop.jpg?v=7517ea94ce'
    },
    {
        title: 'Jurassic Park',
        description: 'A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids.',
        year: 1993,
        directedBy: 'Steven Spielberg',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        rating: 8,
        imageUrl: 'https://a.ltrbxd.com/resized/sm/upload/1g/zz/ez/d8/yyCKYaW908ZbpexpnBJ3p8o87HA-0-1000-0-1500-crop.jpg?v=19a50874d0'
    },
    {
        title: 'The Lion King',
        description: 'Lion prince Simba and his father are targeted by his bitter uncle.',
        year: 1994,
        directedBy: 'Roger Allers, Rob Minkoff',
        genre: ['Animation', 'Adventure', 'Drama'],
        rating: 8,
        imageUrl: 'https://a.ltrbxd.com/resized/sm/upload/lz/96/yu/mf/ztuEReeV6ofpU1HxUV9AsR6aLoe-0-1000-0-1500-crop.jpg?v=47499379fa'
    },
    {
        title: 'Interstellar',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        year: 2014,
        directedBy: 'Christopher Nolan',
        genre: ['Adventure', 'Drama', 'Sci-Fi'],
        rating: 8,
        imageUrl: 'https://a.ltrbxd.com/resized/film-poster/1/1/7/6/2/1/117621-interstellar-0-1000-0-1500-crop.jpg?v=7ad89e6666'
    },
    {
        title: 'Inglourious Basterds',
        description: 'In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers.',
        year: 2009,
        directedBy: 'Quentin Tarantino',
        genre: ['Adventure', 'Drama', 'War'],
        rating: 8,
        imageUrl: 'https://a.ltrbxd.com/resized/film-poster/4/1/3/5/2/41352-inglourious-basterds-0-1000-0-1500-crop.jpg?v=0c74c673e0'
    },
    {
        title: 'The Social Network',
        description: 'The story of the founders of the social-networking website, Facebook.',
        year: 2010,
        directedBy: 'David Fincher',
        genre: ['Biography', 'Drama'],
        rating: 7,
        imageUrl: 'https://a.ltrbxd.com/resized/sm/upload/nw/cm/pa/ai/sGQv3ZMZBDBnl3z42Q0mEQ5uiDe-0-1000-0-1500-crop.jpg?v=54ee59f7cd'
    }
]

async function main() {
    console.log('Start seeding...')
    for (const movie of movieArray) {
        const createdMovie = await prisma.film.create({
            data: {
                ...movie,
                genre: {
                    set: movie.genre,
                },
            },
        })
        console.log(`Created movie with id: ${createdMovie.id}`)
    }
    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })