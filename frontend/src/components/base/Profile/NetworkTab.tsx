import { useEffect, useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { UserConnections } from '../../../lib/services/types';

const NetworkTab = () => {
    const { getToken } = useAuth();
    const [activeTab, setActiveTab] = useState('following');
    const [followers, setFollowers] = useState<UserConnections>([]);
    const [following, setFollowing] = useState<UserConnections>([]);
    const [everyone, setEveryone] = useState<UserConnections>([]);
    const tabs = [
        { id: 'following', label: 'Following' },
        { id: 'followers', label: 'Followers' },
        { id: 'blocked', label: 'Blocked' },
        { id: 'everyone', label: 'Everyone' },
    ];

    const fetchNetworkData = async () => {
        fetch(`${process.env.VITE_API_URL}/api/profile/network`, {
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
        fetch(`${process.env.VITE_API_URL}/api/profile/network/all`, {
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

    }, []);

    const toggleFollow = async (userId: string) => {
        try {
            const response = await fetch(`${process.env.VITE_API_URL}/api/profile/network/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                // Update the local state
                setEveryone(prevEveryone => prevEveryone.map(user => {
                    return user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
                }));
                // Update following/followers lists
                if (data.action === 'followed') {
                    const userToAdd = everyone.find(user => user.id === userId);
                    if (userToAdd) {
                        setFollowing(prev => [...prev, userToAdd]);
                    }
                } else if (data.action === 'unfollowed') {
                    setFollowing(prev => prev.filter(user => user.id !== userId));
                }
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
        }
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
                {/* following */}
                {activeTab === 'following' && (
                    <div className="w-full">
                        {following.map((user: any) => (
                            user && user.name ? (
                                <div key={user.id} className='border border-gray-700 p-2 rounded-md w-full'>
                                    <div className='flex items-center justify-between gap-2'>
                                        <div className='flex items-center gap-2'>
                                            <img src={user.imageUrl} className='w-10 h-10 rounded-full' alt={user.name} />
                                            {user.name}
                                        </div>
                                        <button
                                            className={`text-white p-2 rounded-md bg-red-500`}
                                            onClick={() => toggleFollow(user.id)}
                                        >
                                            unfollow
                                        </button>
                                    </div>
                                </div>
                            ) : null
                        ))}
                    </div>
                )}
                {/* followers */}
                {activeTab === 'followers' && (
                    <div className="w-full">
                        {followers.map((user: any) => (
                            user && user.name ? (
                                <div key={user.id} className='border border-gray-700 p-2 rounded-md w-full'>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <img src={user.imageUrl} className='w-10 h-10 rounded-full' alt={user.name} />
                                            {user.name}
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))}
                    </div>
                )}
                {/* blocked users */}
                {activeTab === 'blocked' && <div>You have not blocked anyone</div>}
                {/* show all users */}
                {activeTab === 'everyone' && <div>{everyone.map((user: any) => (
                    <div key={user.id} className='border border-gray-700 p-2 rounded-md w-full'>
                        {console.log('user to follow here', user)}
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <img src={user.imageUrl} className='w-10 h-10 rounded-full' alt={user.name} />
                                {user.name}
                            </div>
                            <button
                                className={`text-white p-2 rounded-md ${user.isFollowing ? 'bg-red-500' : 'bg-green-500'}`}
                                onClick={() => toggleFollow(user.id)}
                            >
                                {user.isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    </div>
                ))}</div>}
            </div>
        </div>
    );
};

export default NetworkTab;
