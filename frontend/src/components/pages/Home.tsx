import React from "react";


export default function Home() {
	return (
		<div className="flex flex-col w-full h-screen items-center bg-transparent">
			<div className="flex flex-row items-center justify-evenly w-8/12">
				<div>
					Filters
				</div>
				<div>
					Search Box
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