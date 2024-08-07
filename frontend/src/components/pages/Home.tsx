import { useState } from "react";

export default function Home() {

	const [year, setYear] = useState("All");
	const [rating, setRating] = useState("Highest Rated");
	const [popular, setPopular] = useState("All Time");
	const [genre, setGenre] = useState("All");
	const [search, setSearch] = useState("");

	return (
		<div className="flex flex-col w-full h-screen items-center bg-transparent">
			<div className="flex flex-row items-center justify-evenly w-8/12 mt-6">
				<div className="flex flex-row items-center justify-evenly gap-2" >
					<h1 className="text-md font-Inter uppercase">Browse By</h1>
					<div className="flex flex-row items-center gap-2">
						<select name="year" id="year-select" className="bg-transparent border border-1 border-gray-600" value={year} onChange={(e) => setYear(e.target.value)}>
							<option value="All">All</option>
							<option value="Upcoming">Upcoming</option>
							<option value="2020s">2020s</option>
							<option value="2010s">2010s</option>
							<option value="2000s">2000s</option>
							<option value="1990s">1990s</option>
							<option value="1980s">1980s</option>
							<option value="1970s">1970s</option>
							<option value="1960s">1960s</option>
							<option value="1950s">1950s</option>
							<option value="1940s">1940s</option>
							<option value="1930s">1930s</option>
							<option value="1920s">1920s</option>
							<option value="1910s">1910s</option>
							<option value="1900s">1900s</option>
							<option value="1890s">1890s</option>
							<option value="1880s">1880s</option>
							<option value="1870s">1870s</option>
						</select>
						<select name="rating" id="rating-select" className="bg-transparent border border-1 border-gray-600" value={rating} onChange={(e) => setRating(e.target.value)}>
							<option value="Highest Rated">Highest Rated</option>
							<option value="Lowest Rated">Lowest Rated</option>
							<option value="Top 250 Narrative Feature">Top 250 Narrative Feature</option>
							<option value="Top 250 Documentaries">Top 250 Documentaries</option>
						</select>
						<select name="popular" id="popular-select" className="bg-transparent border border-1 border-gray-600" value={popular} onChange={(e) => setPopular(e.target.value)}>
							<option value="All Time">All Time</option>
							<option value="This Year">This Year</option>
							<option value="This Month">This Month</option>
							<option value="This Week">This Week</option>
						</select>
						<select name="genre" id="genre-select" className="bg-transparent border border-1 border-gray-600" value={genre} onChange={(e) => setGenre(e.target.value)}>
							<option value="action">Action</option>
							<option value="adventure">Adventure</option>
							<option value="animation">Animation</option>
							<option value="comedy">Comedy</option>
							<option value="crime">Crime</option>
							<option value="documentary">Documentary</option>
							<option value="drama">Drama</option>
							<option value="family">Family</option>
							<option value="fantasy">Fantasy</option>
							<option value="history">History</option>
							<option value="horror">Horror</option>
							<option value="music">Music</option>
							<option value="mystery">Mystery</option>
							<option value="romance">Romance</option>
							<option value="science fiction">Science Fiction</option>
							<option value="tv movie">TV Movie</option>
							<option value="thriller">Thriller</option>
							<option value="war">War</option>
							<option value="western">Western</option>
						</select>
					</div>
				</div>
				<div className="flex flex-row items-center gap-2">
					<h1 className="text-md font-Inter uppercase">Find A Film</h1>
					<input 
						type="text" 
						className="bg-transparent border border-1 border-gray-600 shadow-inner" 
						value={search} 
						onChange={(e) => setSearch(e.target.value)} 
					/>
				</div>
			</div>
			<div className="flex flex-col items-center h-screen w-8/12">
				<h1>popular movies</h1>
				<div className="flex flex-row">
					<div className="w-1/4 flex flex-col items-center">
						<img src="https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" alt="movie" />
						<h1>Movie Title</h1>
					</div>

				</div>
			</div>
		</div>
	);
}