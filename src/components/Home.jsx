import React from "react";

const Home = () => {
  return (
    <div className="h-[calc(100vh-150px)] grid place-content-center text-center text-white">
      <div>
        <h1 className="text-3xl font-bold mb-2">No Folders Found</h1>
        <p className="text-gray-400">You haven’t created any folders yet.</p>
      </div>
    </div>
  );
};

export default Home;
