import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const ProfileFilmTab = () => {
    const { getToken } = useAuth();
    const [watchedFilms, setWatchedFilms] = useState([]);

    // FETCHED PROFILE WATCHED FILMS
    const fetchWatchedFilms = async () => {
        try {
            const token = await getToken();
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/watched`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch watched films');
            }

            const data = await response.json();
            setWatchedFilms(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching watched films:', error);
        }
    };

    useEffect(() => {
        fetchWatchedFilms();
    }, []);

    return (
        <div className="text-slate-200 m-8">
            <div className="text-sm text-slate-400 font-bold">WATCHED</div>
            <div className="border-b border-slate-700 my-2"></div>

            <div className="grid grid-cols-4 gap-4 mt-2">
                {watchedFilms.length > 0 ? (
                    watchedFilms.map((film, index) => (
                        <div key={index} className="w-40 h-56 border border-slate-700 rounded-lg">
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

export default ProfileFilmTab;
