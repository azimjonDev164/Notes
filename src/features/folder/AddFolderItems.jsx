import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";

const AddFolderItems = ({ id, setFiles }) => {
  const [file, setFile] = useState("");
  const [err, setErr] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getFilesHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/file?folderId=${id}`);
      setFiles(res.data);
    } catch (error) {
      console.log("Error fetching files:", error);
    }
  };

  const addFileHandler = async () => {
    try {
      if (file && id) {
        await axios.post(`${BASE_URL}/file/${id}`, { title: file });
        await getFilesHandler();
        setErr("");
      }
      setFile("");
    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.message);
      console.log(err);
    }
  };

  useEffect(() => {
    setErr("");
  }, [file]);

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-gray-900 px-4 py-3 border-t border-gray-700 z-50">
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
          <span>Error! Task failed successfully.</span>
        </div>
      ) : (
        ""
      )}
      <div className="flex items-center max-w-[860px] mx-auto gap-3">
        <input
          type="text"
          placeholder="Title..."
          value={file}
          onChange={(e) => setFile(e.target.value)}
          required
          className="flex-1 min-w-0 bg-gray-800 text-white text-[16px] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        />

        <FontAwesomeIcon
          icon={faFileCirclePlus}
          onClick={addFileHandler}
          className="text-yellow-400 text-2xl cursor-pointer hover:text-yellow-300 transition-colors duration-200"
        />
      </div>
    </div>
  );
};

export default AddFolderItems;
