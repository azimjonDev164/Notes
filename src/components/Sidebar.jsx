import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faFolder,
  faFolderPlus,
  faNotesMedical,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Sidebar = ({ active }) => {
  const [addFolder, setAddFolder] = useState(false);
  const [folders, setFolders] = useState([]);
  const [folderFiles, setFolderFiles] = useState({});
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [editFolder, setEditFolder] = useState({ id: null, title: "" });
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [error, setErrorMsg] = useState("");
  const [err, setErr] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const addFolderRef = useRef();
  const navigate = useNavigate();

  const getToken = async () => {
    return await getAccessTokenSilently();
  };

  const getUser = async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch("http://localhost:3000/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const addFolderHandler = () => {
    setAddFolder(true);
    setTimeout(() => {
      addFolderRef.current?.focus();
    }, 100);
  };

  const addFolderName = async (e) => {
    if (!isAuthenticated) return;
    e.preventDefault();
    setAddFolder(false);
    const token = await getToken();
    try {
      await axios.post(
        `${BASE_URL}/folder`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTitle("");
      await getFolders();
    } catch (err) {
      console.error("Create folder failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFolders = async (text = "") => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const token = await getToken();

      // Make GET request with optional title query
      const response = await axios.get(`${BASE_URL}/folder`, {
        headers: { Authorization: `Bearer ${token}` },
        params: text ? { title: text } : {}, // automatically adds ?title= if needed
      });

      const foldersData = response.data;
      setFolders(foldersData);

      // Fetch files for each folder
      const filesMap = {};
      await Promise.all(
        foldersData.map(async (folder) => {
          const res = await axios.get(
            `${BASE_URL}/file?folderId=${folder.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          filesMap[folder.id] = res.data;
        })
      );

      setFolderFiles(filesMap);
      setSuccess(true);
    } catch (error) {
      console.error("Get folders error:", error);
      setError(true);
      setErrorMsg(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshHandler = async () => {
    await getFolders();
  };

  const editFolderHandler = async (id, e) => {
    e.preventDefault();
    const token = await getToken();
    try {
      await axios.patch(
        `${BASE_URL}/folder/${id}`,
        { title: editFolder.title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditFolder({ id: null, title: "" });
      await getFolders();
    } catch (err) {
      console.error("Edit folder failed:", err);
    }
  };

  const deleteFolder = async (id) => {
    const token = await getToken();
    try {
      await axios.delete(`${BASE_URL}/folder/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getFolders();
    } catch (err) {
      console.error("Delete folder failed:", err);
      setErr(err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      const token = await getToken();

      await getUser(); // ✅ Gets user info
      await getFolders(); // ✅ Initial folder fetch
    };

    if (isAuthenticated) {
      init();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const init = async () => {
      await getFolders(search); // handles search and full list
    };

    if (isAuthenticated) {
      init();
    }
  }, [search]);

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
                      setEditFolder({ id: folder.id, title: folder.title })
                    }
                    className="hover:bg-gray-700 hover:text-yellow-400"
                  >
                    Edit
                  </button>
                </li>
                <li onClick={() => deleteFolder(folder.id)}>
                  <button className="hover:bg-gray-700 hover:text-red-400">
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </summary>

          <ul className="mt-3 ml-8 space-y-1">
            {folderFiles[folder.id]?.length ? (
              folderFiles[folder.id].map((file) => (
                <li key={file.id}>
                  <button
                    className="flex items-center gap-2 text-sm hover:text-yellow-400 transition"
                    onClick={() => navigate(`/folder/file/${file.id}`)}
                  >
                    <FontAwesomeIcon
                      icon={faNotesMedical}
                      className="text-yellow-400 text-base"
                    />
                    {file.title}
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-400 text-sm italic">No files yet</li>
            )}
          </ul>
        </details>
      </li>
    ));
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div
      className={`${
        active ? "block" : "hidden"
      } md:block resize-x overflow-auto bg-gray-900 text-white w-64 min-w-[12rem] max-w-[80vw] p-4 shadow-lg border-r border-gray-700`}
    >
      {/* Search and Add Folder */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

        <FontAwesomeIcon
          icon={faFolderPlus}
          onClick={addFolderHandler}
          className="text-yellow-400 text-2xl cursor-pointer hover:text-yellow-300 transition"
          title="Add Folder"
        />

        <FontAwesomeIcon
          icon={faRefresh}
          onClick={refreshHandler}
          className="text-yellow-400 text-2xl cursor-pointer hover:text-yellow-300 transition"
          title="Refresh"
        />
      </div>

      {err.length ? (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{err}</span>
        </div>
      ) : (
        ""
      )}

      <ul className="menu space-y-2 w-full">
        {content}

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
