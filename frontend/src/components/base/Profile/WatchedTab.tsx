import type { Film } from "../../../lib/services/types";

interface WatchedTabProps {
    watchedFilms: Film[];
}

const WatchedTab: React.FC<WatchedTabProps> = ({ watchedFilms }) => {

    return (
        <div className="text-slate-200">
            <div className="text-sm text-slate-400 font-bold">WATCHED</div>
            <div className="border-b border-slate-700 my-2"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 md:mt-2 mt-0">
                {watchedFilms.length > 0 ? (
                    watchedFilms.map((film, index) => (
                        <a href={`/movie/${film.id}`} key={index} className="cursor-pointer my-1">
                            <div id={film.id} className="w-40 h-56 border border-slate-700 rounded-lg">
                                <img src={film.imageUrl} alt={film.title} className="w-full h-full object-cover rounded-lg" />
                                {/* Replace with actual film data */}
                                {/* {film.title}  */}
                            </div>
                        </a>
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
