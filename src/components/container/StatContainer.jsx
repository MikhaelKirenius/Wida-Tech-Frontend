import React from 'react';

const StatContainer = ({textTitle, textStat}) => {
    return (
        <div className="stats shadow">
            <div className="bg-white rounded-lg w-60 h-60 flex flex-col justify-center items-center">
                <div className="p-4 stat-title">
                    {textTitle}
                </div>
                <div className="p-4 stat-value text-lg ">
                    {textStat}
                </div>
            </div>
        </div>
    );
}

export default StatContainer;