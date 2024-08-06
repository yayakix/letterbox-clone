import React, { useState } from 'react';

interface ProfileTabsProps {
    onTabChange: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState('Profile');

    const tabs = ['Profile', 'Watchlist', 'Likes', 'Films'];

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <div className="text-sm font-medium text-center text-gray-500 border-b border-t border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px ">
                {tabs.map((tab) => (
                    <li key={tab} className="me-2">
                        <a
                            href="#"
                            onClick={() => handleTabClick(tab)}
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === tab
                                ? 'text-gray-200 border-green-600 active '
                                : 'border-transparent hover:text-blue-300 '
                                }`}
                            aria-current={activeTab === tab ? 'page' : undefined}
                        >
                            {tab}
                        </a>
                    </li>
                ))}
                <li>
                    <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed ">Lists</a>
                </li>
                <li>
                    <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed ">Network</a>
                </li>
                <li>
                    <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed ">Tags</a>
                </li>
                <li>
                    <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed ">Reviews</a>
                </li>
            </ul>
        </div>
    );
};

export default ProfileTabs;
