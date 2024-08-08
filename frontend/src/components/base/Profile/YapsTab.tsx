import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import YapList from "../Comments/Comment";

const YapsTab = () => {
    const { getToken } = useAuth();
    const [yaps, setYaps] = useState([]);

    const getYaps = async () => {
        fetch(`${process.env.API_URL}/api/profile/yaps`, {
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
    console.log('yaps', yaps)
    return (
        <div className="flex flex-col overflow-y-auto">
            {yaps.map((yap) => (
                <div className="flex flex-row">
                    <img className="w-16 h-full" src={yap.film.imageUrl} />
                    <YapList yap={yap} />
                </div>
            ))}
        </div>
    )
}

export default YapsTab