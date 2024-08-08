import React from 'react';

interface YapListProps {
    yap: Yap;
}

const YapList: React.FC<YapListProps> = ({ yap }) => {
    return (
        <div className="rounded-lg shadow-md p-4 mb-4 bg-transparent">
            <div className="flex items-center mb-2">
                <img src={yap.profile.imageUrl} alt={yap.profile.name} className="w-8 h-8 rounded-full mr-2" />
                <span className="text-slate-300 font-semibold">{yap.profile.name}</span>
            </div>
            <p className="text-slate-400 mb-2">{yap.yap}</p>
            <p className="text-sm text-gray-600">Created at: {new Date(yap.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default YapList;