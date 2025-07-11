import { useParams } from "react-router-dom";
import AddFolderItems from "./AddFolderItems";
import FolderItem from "./FolderItem";
import FolderPath from "./FolderPath";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Folder = () => {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState([]);
  const { id } = useParams();
  const BASE_URL = "http://localhost:3000";
  const { getAccessTokenSilently } = useAuth0();

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return token;
  };

  const getFolderOne = async () => {
    const token = await getToken();
    try {
      const response = await axios.get(`${BASE_URL}/folder/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFolder(response.data);
    } catch (error) {
      console.log("Error fetching files:", error);
    }
  };

  const getFilesHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/file?folderId=${id}`);
      setFiles(res.data);
    } catch (error) {
      console.log("Error fetching files:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getFilesHandler();
      getFolderOne();
    }
  }, [id]); // ✅ updated

  return (
    <div className="hide-scrollbar h-[84vh]">
      <FolderPath folder={folder} />
      <div className="margin-auto overflow-y-scroll hide-scrollbar mb-4 h-[73vh] pl-3">
        <div className="flex flex-wrap gap-2">
          {files.length > 0 ? (
            files.map((file) => (
              <FolderItem
                key={file.id}
                file={file}
                setFiles={setFiles}
                folderId={id}
              />
            ))
          ) : (
            <p className="text-gray-400">No files found.</p>
          )}
        </div>
      </div>
      <AddFolderItems id={id} setFiles={setFiles} />
    </div>
  );
};

export default Folder;
