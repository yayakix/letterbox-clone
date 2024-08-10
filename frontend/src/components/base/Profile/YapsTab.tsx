import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import YapList from "../Comments/Comment";

const YapsTab = () => {
    const { getToken } = useAuth();
    const [yaps, setYaps] = useState<Yap[]>([]);

    const getYaps = async () => {
        fetch(`${process.env.VITE_API_URL}/api/profile/yaps`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setYaps(data);
            })
            .catch(error => console.error('Error fetching yap data:', error));
    }

    useEffect(() => {
        getYaps();

    }, []);
    
    return (
        <div className="flex flex-col overflow-y-auto ">
            {[...yaps].reverse().map((yap) => (
                <div key={yap.id} className="flex flex-row w-full items-center">
                    {yap.film && <a href={`/movie/${yap.film.id}`}><img className="w-16 " src={yap.film.imageUrl} alt={yap.film.title} /></a>}
                    <YapList yap={yap} />
                </div>
            ))}
        </div>
    )
}

export default YapsTab