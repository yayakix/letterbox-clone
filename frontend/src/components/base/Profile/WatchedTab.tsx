export type Film = {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    title: string,
    description: string,
    year: number,
    directedBy: string,
    rating: number,
    genre: string[],
    imageUrl: string,
}

const WatchedTab = ({ watchedFilms }: { watchedFilms: Film[] }) => {
    console.log('watchedFilms', watchedFilms);
    return (
        <div className="text-slate-200 m-8">
            <div className="text-sm text-slate-400 font-bold">WATCHED</div>
            <div className="border-b border-slate-700 my-2"></div>

            <div className="grid grid-cols-4 gap-4 mt-2">
                {watchedFilms.length > 0 ? (
                    watchedFilms.map((film, index) => (
                        <div key={index} className="w-40 h-56 border border-slate-700 rounded-lg">
                            <img src={film.imageUrl} alt={film.title} className="w-full h-full object-cover rounded-lg" />
                            {/* Replace with actual film data */}
                            {film.title}
                        </div>
                    ))
                ) : (
                    // Skeleton loading state
                    [...Array(4)].map((_, index) => (
                        <div key={index} className="w-40 h-56 border border-slate-700 rounded-lg animate-pulse bg-slate-800"></div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WatchedTab;
