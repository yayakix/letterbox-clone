import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import ProfileTabs from "../base/Profile/ProfileTabs";
import ProfileProfileTab from "../base/Profile/ProfileProfileTab";
import WatchedTab from "../base/Profile/WatchedTab";
import NetworkTab from "../base/Profile/NetworkTab";

const UserProfile = () => {
    const [profileData, setProfileData] = useState<any>(null);
    const [currentTab, setCurrentTab] = useState<string>('Profile');
    const { getToken } = useAuth();

    const fetchProfileData = async () => {
        const token = await getToken();
        fetch(`http://localhost:3009/api/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        })
            .then(response => response.json())
            .then(data => setProfileData(data))
            .catch(error => console.error('Error fetching profile data:', error));
    }
    console.log('hello data,', profileData);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleTabChange = (tab: string) => {
        setCurrentTab(tab);

        console.log('Tab changed to:', tab);
    }

    const renderTabContent = () => {
        switch (currentTab) {
            case 'Profile':
                return <ProfileProfileTab />;
            case 'Watchlist':
                return <WatchedTab />;
            case 'Likes':
                // return <ProfileFollowersTab />;
                return <div>Followers Tab Content</div>;
            case 'Network':
                return <NetworkTab />;
            case 'Following':
                // return <ProfileFollowingTab />;
                return <div>Following Tab Content</div>;
            default:
                return <div>Invalid tab</div>;
        }
    };

    return (
        <div>

            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words rounded-2xl">
                <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
                    <div className="flex flex-wrap mb-6 xl:flex-nowrap">
                        <div className="mb-5 mr-5">
                            <div className="relative inline-block shrink-0 rounded-2xl">
                                <img className="inline-block shrink-0 rounded-full w-[80px] h-[80px] object-cover" src={profileData?.imageUrl} alt="profile" />

                            </div>
                        </div>
                        <div className="grow mt-4">
                            <div className="flex flex-wrap items-start justify-between mb-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center mb-2">
                                    </div>
                                    <div className="flex flex-wrap pr-2 mb-4 font-medium">
                                        <span className="mr-4 text-2xl text-white font-bold">
                                            Username
                                        </span>

                                        <button className="bg-slate-600 border border-slate-700 text-slate-300 px-4 py-1 text-sm rounded-md">Edit Profile</button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap my-auto text-slate-200">
                                    <div className="flex flex-col justify-center items-center">
                                        <span className="text-lg font-semibold">0</span>
                                        <span className="text-sm text-slate-400">films</span>
                                    </div>
                                    <div className="w-px h-12 bg-gray-300 mx-4"></div>
                                    <div className="mr-4 flex flex-col justify-center items-center">
                                        <span className="text-lg font-semibold">0</span>
                                        <span className="text-sm text-slate-400 mr-0">followers</span>
                                    </div>
                                    <div className="w-px h-12 bg-gray-300 mr-4"></div>
                                    <div className="mr-4 flex flex-col justify-center items-center">
                                        <span className="text-lg font-semibold">0</span>
                                        <span className="text-sm text-slate-400">following</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <ProfileTabs onTabChange={handleTabChange} />
                </div>
            </div>

            {renderTabContent()}
        </div >
    )
}

export default UserProfile