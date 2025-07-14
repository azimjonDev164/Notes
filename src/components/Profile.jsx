import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Profile = () => {
  // const [user, setUser] = useState({});
  const { user } = useAuth0();

  return (
    <div className="p-4">
      <div className="card card-side bg-gray-900 text-white shadow-lg rounded-xl items-center gap-6 p-4">
        {/* Avatar */}
        <div className="avatar">
          <div className="w-28 h-28 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2 overflow-hidden cursor-pointer">
            <img src={user?.picture} alt={user?.name} />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          {/* Optional: Add email or status */}
          <p className="text-gray-400">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
