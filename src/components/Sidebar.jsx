import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faFolder,
  faFolderPlus,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Sidebar = () => {
  const [addFolder, setAddFolder] = useState(false);
  const [folders, setFolders] = useState([]);
  const [title, setTitle] = useState("");
  const [editFolder, setEditFolder] = useState({ id: null, title: "" });
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [error, setErrorMsg] = useState("");
  const BASE_URL = "http://localhost:3000";
  const { getAccessTokenSilently } = useAuth0();

  const addFolderRef = useRef();
  const navigate = useNavigate();

  // get a token
  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return token;
  };

  // focus on form that is adding folder
  const addFolderHandler = () => {
    setAddFolder(true);
    setTimeout(() => {
      addFolderRef.current?.focus();
    }, 100);
  };

  // add a new folder
  const addFolderName = async (e) => {
    e.preventDefault();
    setAddFolder(false);
    const token = await getToken();
    try {
      await axios.post(
        `${BASE_URL}/folder`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle(""); // ✅ Clear input
      await getFolders();
    } catch (err) {
      console.error("Create folder failed:", err); // ✅ Debug
    } finally {
      setLoading(false);
    }
  };

  // get all folders
  const getFolders = async () => {
    const token = await getToken();

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/folder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      setLoading(false);
      console.log(response.data);
      setFolders(response.data);
    } catch (error) {
      setError(true);
      setLoading(false);
      setSuccess(false);
      setErrorMsg(error?.message);
    }
  };

  // adit a folder
  const editFolderHandler = async (id, e) => {
    e.preventDefault();
    const token = await getToken();
    try {
      await axios.patch(
        `${BASE_URL}/folder/${id}`,
        { title: editFolder.title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditFolder({ id: null, title: "" });
      await getFolders(); // refresh list
    } catch (err) {
      console.error("Create folder failed:", err); // ✅ Debug
    }
  };

  // delete a folder
  const deleteFolder = async (id) => {
    const token = await getToken();
    try {
      await axios.delete(`${BASE_URL}/folder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getFolders();
    } catch (err) {
      console.error("Create folder failed:", err); // ✅ Debug
    }
  };

  useEffect(() => {
    getFolders();
  }, []);

  let content;

  if (isLoading) {
    content = (
      <div className="flex w-52 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-8 w-8 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-2 w-20"></div>
            <div className="skeleton h-2 w-28"></div>
          </div>
        </div>
      </div>
    );
  } else if (isSuccess) {
    content = folders.map((folder) => (
      <li key={folder.id}>
        <details open className="bg-gray-800 rounded-xl p-1 shadow-md">
          <summary className="flex items-center justify-between text-white cursor-pointer">
            <div className="flex flex-1 items-center gap-3">
              <FontAwesomeIcon
                icon={faFolder}
                className="text-yellow-400 text-xl"
              />
              <span
                onClick={() => navigate(`/folder/${folder.id}`)}
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                {editFolder.id === folder.id ? (
                  <form
                    onSubmit={(e) => editFolderHandler(folder.id, e)}
                    className="flex items-center gap-2 px-2 py-1 bg-gray-800 rounded-lg"
                  >
                    <input
                      type="text"
                      onChange={(e) =>
                        setEditFolder({ ...editFolder, title: e.target.value })
                      }
                      defaultValue={editFolder.title}
                      placeholder="Edit folder name"
                      className="bg-transparent text-white border-b border-yellow-400 outline-none w-full focus:ring-0 text-sm"
                    />
                  </form>
                ) : (
                  folder.title
                )}
              </span>
            </div>

            {/* Dropdown for Edit/Delete */}
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-sm hover:bg-gray-700 rounded-full"
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-900 text-white rounded-lg shadow-lg mt-2 w-36 z-[999] border border-gray-700"
              >
                <li>
                  <button
                    onClick={() =>
                      setEditFolder({ id: folder.id, title: folder?.title })
                    }
                    className="hover:bg-gray-700 hover:text-yellow-400"
                  >
                    Edit
                  </button>
                </li>
                <li onClick={() => deleteFolder(folder?.id)}>
                  <button className="hover:bg-gray-700 hover:text-red-400">
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </summary>

          {/* Folder Submenu */}
          <ul className="mt-3 ml-8 space-y-1">
            <li>
              <button
                className="flex items-center gap-2 text-sm hover:text-yellow-400 transition"
                onClick={() => navigate(`/folder/file/${folder.id}`)}
              >
                <FontAwesomeIcon
                  icon={faNotesMedical}
                  className="text-yellow-400 text-base"
                />
                Submenu 1
              </button>
            </li>
          </ul>
        </details>
      </li>
    ));
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className="resize-x overflow-auto bg-gray-900 text-white w-64 min-w-[12rem] max-w-[80vw]  p-4 shadow-lg border-r border-gray-700">
      {/* Search and Add Folder */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search"
            className="w-full px-10 py-2 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </div>

        {/* Add Folder Button */}
        <FontAwesomeIcon
          icon={faFolderPlus}
          onClick={addFolderHandler}
          className="text-yellow-400 text-2xl cursor-pointer hover:text-yellow-300 transition"
          title="Add Folder"
        />
      </div>

      {/* Folder Tree */}
      <ul className="menu space-y-2 w-full">
        {content}

        {/* New Folder Input */}
        {addFolder && (
          <li className="mt-2">
            <form
              onSubmit={addFolderName}
              className="flex items-center gap-2 px-2 py-1 bg-gray-800 rounded-lg"
            >
              <FontAwesomeIcon
                icon={faFolder}
                className="text-yellow-400 text-xl"
              />
              <input
                type="text"
                ref={addFolderRef}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New folder name"
                className="bg-transparent text-white border-b border-yellow-400 outline-none w-full focus:ring-0 text-sm"
              />
            </form>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
