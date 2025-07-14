import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const FolderItem = ({ file, setFiles, folderId }) => {
  const navigate = useNavigate();
  const [editFile, setEditFile] = useState({});
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getFilesHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/file?folderId=${folderId}`);
      setFiles(res.data);
      console.log(res);
    } catch (error) {
      console.log("Error fetching files:", error);
    }
  };

  const deleteFile = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/file/${id}`);
      await getFilesHandler();
    } catch (err) {
      console.error("Delete folder failed:", err);
    }
  };

  const editFileHandler = async (id, e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BASE_URL}/file/${id}`, { title: editFile.title });
      setEditFile({ id: null, title: "" });
      await getFilesHandler();
    } catch (err) {
      console.error("Edit folder failed:", err);
    }
  };

  return (
    <div className="card card-side items-center px-3 h-[80px] w-[300px] transition-transform duration-200 hover:ring-1 hover:ring-yellow-500 bg-gray-900 shadow-md shadow-gray-700 cursor-pointer ">
      <FontAwesomeIcon
        icon={faNotesMedical}
        className="text-yellow-400 text-4xl"
      />
      <div className="card-body">
        {editFile.id ? (
          <form
            onSubmit={(e) => editFileHandler(file.id, e)}
            className="flex items-center gap-2 px-2 py-1 bg-gray-800 rounded-lg"
          >
            <input
              type="text"
              onChange={(e) =>
                setEditFile({ ...editFile, title: e.target.value })
              }
              defaultValue={editFile.title}
              placeholder="Edit folder name"
              className="bg-transparent text-white border-b border-yellow-400 outline-none w-full focus:ring-0 text-sm"
            />
          </form>
        ) : (
          <h2
            onClick={() => navigate(`/folder/file/${file.id}`)}
            className="card-title"
          >
            {file.title}{" "}
          </h2>
        )}
        <p>13:09:2025</p>
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
              onClick={() => setEditFile({ id: file.id, title: file.title })}
              className="hover:bg-gray-700 hover:text-yellow-400"
            >
              Edit
            </button>
          </li>
          <li onClick={() => deleteFile(file.id)}>
            <button className="hover:bg-gray-700 hover:text-red-400">
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FolderItem;
