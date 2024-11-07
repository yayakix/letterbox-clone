import { useEffect, useState } from "react";
import ProfileTabs from "../base/Profile/ProfileTabs";
import ProfileProfileTab from "../base/Profile/ProfileProfileTab";
import WatchedTab from "../base/Profile/WatchedTab";
import NetworkTab from "../base/Profile/NetworkTab";
import YapsTab from "../base/Profile/YapsTab";
import useUserStore from "../../state/user";

const UserProfile = () => {
    const { user } = useUserStore();

    const [profileData, setProfileData] = useState<any>(null);
    const [likedFilms, setLikedFilms] = useState<any>([]);
    const [watchedFilms, setWatchedFilms] = useState<any>([]);
    const [currentTab, setCurrentTab] = useState<string>('Liked');


    useEffect(() => {
        setProfileData(user);
        setWatchedFilms(user?.watched);
        setLikedFilms(user?.liked);
    }, [user]);

    const handleTabChange = (tab: string) => {
        setCurrentTab(tab);
    }

    const renderTabContent = () => {
        switch (currentTab) {
            case 'Liked':
                return <ProfileProfileTab likedFilms={likedFilms || []} />;
            case 'Watchlist':
                return <WatchedTab watchedFilms={watchedFilms} />;
            case 'Reviews':
                return <YapsTab />;
            case 'Network':
                return <NetworkTab />;
            case 'Following':
                // return <ProfileFollowingTab />;
                return <div>Following Tab Content</div>;
            default:
                return <div>Invalid tab</div>;
        }
    };
    console.log('profile data here', profileData)

    return (
        <div className="lg:px-48">
            {user && (
                <div className="relative flex flex-col w-full min-w-0 mb-6 break-words rounded-2xl ">
                    <div className="pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
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

                                            <a href="/profile/edit">
                                                <button className="bg-slate-600 border border-slate-700 text-slate-300 px-4 py-1 text-sm rounded-md">Edit Profile</button>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap my-auto text-slate-200">
                                        <div className="flex flex-col justify-center items-center">
                                            <span className="text-lg font-semibold">{profileData?.watched.length || 0}</span>
                                            <span className="text-sm text-slate-400">films</span>
                                        </div>
                                        <div className="w-px h-12 bg-gray-300 mx-4"></div>
                                        <div className="mr-4 flex flex-col justify-center items-center">
                                            <span className="text-lg font-semibold">{profileData?.following.length || 0}</span>
                                            <span className="text-sm text-slate-400 mr-0">followers</span>
                                        </div>
                                        <div className="w-px h-12 bg-gray-300 mr-4"></div>
                                        <div className="mr-4 flex flex-col justify-center items-center">
                                            <span className="text-lg font-semibold">{profileData?.followers.length || 0}</span>
                                            <span className="text-sm text-slate-400">following</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <ProfileTabs onTabChange={handleTabChange} />
                    </div>
                </div>
            )}

            {renderTabContent()}
        </div >
    )
}

export default UserProfile
