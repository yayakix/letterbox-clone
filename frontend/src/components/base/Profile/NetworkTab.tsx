import { useEffect, useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
// import { useNavigate } from 'react-router'

const NetworkTab = () => {
    const { getToken } = useAuth();
    const [activeTab, setActiveTab] = useState('following');
    const [followers, setFollowers] = useState<any>([]);
    const [following, setFollowing] = useState<any>([]);
    const [everyone, setEveryone] = useState<any>([]);
    // const navigate = useNavigate()

    const [refresh, setRefresh] = useState(false);
    const handleRefresh = () => {
        setRefresh(prev => !prev); // Toggle refresh state
    };

    const tabs = [
        { id: 'following', label: 'Following' },
        { id: 'followers', label: 'Followers' },
        { id: 'blocked', label: 'Blocked' },
        { id: 'everyone', label: 'Everyone' },
    ];
    // fetch current followers/following

    const fetchNetworkData = async () => {
        fetch(`${process.env.API_URL}/api/profile/network`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setFollowers(data.followers);
                setFollowing(data.following);
            })
            .catch(error => console.error('Error fetching profile data:', error));

        // fetch everyone
        fetch(`${process.env.API_URL}/api/profile/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setEveryone(data);
            })
            .catch(error => console.error('Error fetching everyone:', error));
    }

    useEffect(() => {
        fetchNetworkData();

    }, [refresh]);



    const toggleFollow = async (unfollowUserId: string) => {
        fetch(`${process.env.API_URL}/api/profile/network/${unfollowUserId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('data', data);
            })
        handleRefresh()
    }




    return (
        <div className="text-slate-200">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-700 ">
                <ul className="flex flex-wrap -mb-px">
                    {tabs.map((tab) => (
                        <li key={tab.id} className="me-2">
                            <a
                                href="#"
                                className={`inline-block p-2 border-b-2 rounded-t-lg ${activeTab === tab.id
                                    ? 'text-slate-200 border-white'
                                    : 'border-transparent hover:border-green-500 text-green-500'
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab(tab.id);
                                }}
                            >
                                {tab.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4 border border-gray-700 h-96 w-full overflow-y-auto">
                {activeTab === 'following' && <div>{following.map((user: any) => (
                    <div key={user.id} className='border border-gray-700 p-2 rounded-md w-full'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <img src={user.imageUrl} className='w-10 h-10 rounded-full'></img>
                                {user.name}
                            </div>
                            <button className='bg-red-500 text-white p-2 rounded-md' onClick={() => toggleFollow(user.id)}>Unfollow</button>
                        </div>
                    </div>
                ))}</div>}
                {activeTab === 'followers' && <div>{followers.map((user: any) => (
                    <div key={user.id} className='border border-gray-700 p-2 rounded-md w-full'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <img src={user.imageUrl} className='w-10 h-10 rounded-full'></img>
                                {user.name}
                            </div>
                        </div>
                    </div>
                ))}</div>}
                {activeTab === 'blocked' && <div>You have not blocked anyone</div>}
                {activeTab === 'everyone' && <div>{everyone.map((user: any) => (
                    <div key={user.id} className='border border-gray-700 p-2 rounded-md w-full'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <img src={user.imageUrl} className='w-10 h-10 rounded-full'></img>
                                {user.name}
                            </div>
                            <button className='bg-green-500 text-white p-2 rounded-md' onClick={() => toggleFollow(user.id)}>Follow</button>
                        </div>
                    </div>
                ))}</div>}
            </div>
        </div>
    );
};

export default NetworkTab;
