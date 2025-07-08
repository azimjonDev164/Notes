import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="hover:text-yellow-400 cursor-pointer"
      onClick={() => logout()}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
