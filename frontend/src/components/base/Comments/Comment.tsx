import React from 'react';

interface YapListProps {
    yap: Yap;
}

const YapList: React.FC<YapListProps> = ({ yap }) => {
    return (
        <div className="rounded-lg shadow-md p-4 mb-4 bg-transparent">
            <p className="text-slate-400 mb-2">{yap.yap}</p>
            <p className="text-sm text-gray-600 ">Created at: {new Date(yap.createdAt).toLocaleString()}</p>
            {/* Add more yap properties as needed */}
        </div>
    );
};

export default YapList;