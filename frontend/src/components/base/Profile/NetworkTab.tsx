import { useState } from 'react';

const NetworkTab = () => {
    const [activeTab, setActiveTab] = useState('followers');

    const tabs = [
        { id: 'following', label: 'Following' },
        { id: 'followers', label: 'Followers' },
        { id: 'blocked', label: 'Blocked' },
    ];

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

            <div className="mt-4 border border-gray-700 h-96 w-full flex justify-center items-center text-slate-500">
                {activeTab === 'following' && <div>You are not following anyone</div>}
                {activeTab === 'followers' && <div>You are not followed by anyone</div>}
                {activeTab === 'blocked' && <div>You have not blocked anyone</div>}
            </div>
        </div>
    );
};

export default NetworkTab;
