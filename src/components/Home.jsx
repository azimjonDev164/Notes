import React from "react";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated, error } = useAuth0();
  return (
    <div className="h-[calc(100vh-150px)] grid place-content-center text-center text-white">
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br text-white p-8">
        <h1 className="text-4xl font-bold mb-4 text-yellow-400">
          Welcome to My Notes App!
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl text-center leading-relaxed mb-6">
          Stay organized, focused, and productive with your personal note-taking
          app. Easily create, edit, complete, and delete notes — all in a clean,
          modern interface. Built with using{" "}
          <span className="text-red-400">Nest JS</span>,{" "}
          <span className="text-blue-400">React</span>,{" "}
          <span className="text-pink-400">Tailwind CSS</span>, and{" "}
          <span className="text-green-400">Prisma</span>.
        </p>

        {isAuthenticated ? (
          <a className="btn btn-primary text-white bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg shadow-md transition duration-300">
            Create your notes
          </a>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
};

export default Home;
