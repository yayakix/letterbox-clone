import { useEffect, useState } from "react";
import { Film } from "../../lib/services/users/types";

export default function Home() {

	const [year, setYear] = useState("All");
	const [rating, setRating] = useState("Highest Rated");
	const [genre, setGenre] = useState("All");
	const [search, setSearch] = useState("");
	const [movies, setMovies] = useState<Film[]>([]);
	const [searchResults, setSearchResults] = useState<Film[]>([]);

	useEffect(() => {
		getAllMovies();
	}, [1]);

	const getAllMovies = async () => {
		const response = await fetch("/api/movies");
		const data = await response.json();
		setMovies(data);
	}

	const getMoviesBySearch = async () => {
		const response = await fetch(`/api/movies/search?search=${search}`);
		const data = await response.json();
		setSearchResults(data);
	}

	const makeCapitalCase = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	const filterMovies = async (type: string, filter: string) => {
		let filterValue = filter;

		if (type === "year") {
			filterValue = parseInt(filter).toString().slice(0, 4);
		}

		if (type === "genre") {
			filterValue = makeCapitalCase(filter);
		}

		console.log("type", type);
		console.log("filterValue", filterValue);

		const response = await fetch(`/api/movies/filter?type=${type}&filter=${filterValue}`);
		const data = await response.json();
		console.log(data);
		setMovies(data);
	}

	return (
		<div className="flex flex-col w-full h-full items-center bg-transparent">
			<div className="flex flex-row items-center justify-between w-7/12 mt-6">
				<div className="flex flex-row items-center justify-evenly gap-2" >
					<h1 className="text-md font-Inter uppercase">Browse By</h1>
					<div className="flex flex-row items-center gap-2">
						<select
							name="year"
							id="year-select"
							className="bg-transparent border border-1 border-gray-600"
							value={year}
							onChange={(e) => {
								setYear(e.target.value);
								filterMovies("year", e.target.value);
							}}
						>
							<option value="All">All</option>
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
						<select
							name="rating"
							id="rating-select"
							className="bg-transparent border border-1 border-gray-600"
							value={rating}
							onChange={(e) => {
								setRating(e.target.value);
								filterMovies("rating", e.target.value);
							}}
						>
							<option value="All">All</option>
							<option value="Highest Rated">Highest Rated</option>
							<option value="Lowest Rated">Lowest Rated</option>
						</select >
						<select
							name="genre"
							id="genre-select"
							className="bg-transparent border border-1 border-gray-600"
							value={genre}
							onChange={(e) => {
								setGenre(e.target.value)
								filterMovies("genre", e.target.value)
							}}
						>
							<option value="all">All</option>
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
					</div >
				</div >
				<div className="flex flex-row items-center gap-2">
					<h1 className="text-md font-Inter uppercase">Find A Film</h1>
					<input
						type="text"
						className="bg-transparent border border-1 border-gray-600 shadow-inner"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setMovies([]);
								getMoviesBySearch();
							}
						}}
						onBlur={() => {
							setSearchResults([]);
							setSearch("");
							getAllMovies();
						}}
					/>
				</div>
			</div >
			<div className="flex flex-col items-center h-full w-full mt-12">
				<div className="flex flex-col items-center w-7/12">
					<div className="flex flex-row items-end justify-between w-full">
						<h1 className="text-sm font-Inter uppercase">Popular Films this Week</h1>
						<h2 className="text-xs font-Inter">More</h2>
					</div>
					<hr className="my-4 border-t border-gray-600 w-full" />
				</div>
				<div className="flex flex-wrap mt-4 w-7/12">
					{searchResults.length > 0 ? (
						searchResults.map((movie) => (
							<div key={movie.id} className="w-1/6 h-1/8 flex flex-col items-center p-2">
								<a href={`/movie/${movie.id}`}><img src={movie.imageUrl} alt="movie" className="w-full h-full object-cover" /></a>
								<div className="flex flex-row w-full justify-evenly mt-1">
									<button
										className={`flex flex-col items-center transition-colors mb-4  text-green-500 hover:text-green-400`}
									>
										<svg
											className="w-4 h-4 mb-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
										</svg>
										<span className="text-xs">{movie.watchedBy?.length || 0}</span>
									</button >
									<button
										className={`flex flex-col items-center transition-colors mb-4  text-yellow-500 hover:text-yellow-400`}
									>
										<svg
											className="w-4 h-4 mb-1"
											fill={"currentColor"}
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
										</svg>
									</button>
								</div >
							</div >
						))
					) : (
						movies.map((movie) => (
							<div key={movie.id} className="w-1/6 h-1/8 flex flex-col items-center p-2">
								<a href={`/movie/${movie.id}`}><img src={movie.imageUrl} alt="movie" className="w-full h-full object-cover" /></a>
								<div className="flex flex-row w-full justify-evenly mt-1">
									<button
										className={`flex flex-col items-center transition-colors mb-4  text-green-500 hover:text-green-400`}
									>
										<svg
											className="w-4 h-4 mb-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
										</svg>
										<span className="text-xs">{movie.watchedBy?.length || 0}</span>
									</button >
									<button
										className={`flex flex-col items-center transition-colors mb-4  text-yellow-500 hover:text-yellow-400`}
									>
										<svg
											className="w-4 h-4 mb-1"
											fill={"currentColor"}
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
										</svg>
									</button>
								</div >
							</div >
						))
					)
					}
				</div >
			</div >
		</div >
	);
}