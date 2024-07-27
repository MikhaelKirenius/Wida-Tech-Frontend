import React from 'react';

const MainContainer = ({children}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-2xl" style={{ width: "500px" }}>
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
