import { useAuth0 } from "@auth0/auth0-react";
import FolderPath from "../folder/FolderPath";
import AddNote from "./AddNotes";
import NoteItem from "./NoteItem";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePage = () => {
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState(null);
  const [notes, setNotes] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const bottomNotes = useRef(null);

  const click = () => {
    bottomNotes.current.scrollIntoView({ behavior: "smooth" });
  };
  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return token;
  };

  const getFolderOne = async () => {
    try {
      const token = await getToken();
      const fileRes = await axios.get(`${BASE_URL}/file/${id}`);
      const folderRes = await axios.get(
        `${BASE_URL}/folder/${fileRes.data.folderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFile(fileRes.data);
      setFolder(folderRes.data);
    } catch (error) {
      console.log("Error fetching file/folder:", error);
    }
  };

  const getNotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notes?fileId=${id}`);
      setNotes(res.data);
    } catch (error) {
      console.log(error);
      setNotes([]);
    }
  };

  useEffect(() => {
    getFolderOne();
    getNotes();
  }, [id]);

  return (
    <div className="hide-scrollbar h-[84vh]">
      <FolderPath folder={folder} file={file} />
      <div className="margin-auto overflow-y-scroll hide-scrollbar mb-4 h-[68.5vh] px-3 py-4">
        <div className="flex flex-col gap-y-4">
          {notes?.length ? (
            notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                getNotes={getNotes}
                click={click}
              />
            ))
          ) : (
            <i>Not Notes yet</i>
          )}
          <div ref={bottomNotes} />
        </div>
      </div>
      <AddNote fileId={id} getNotes={getNotes} clickHandler={click} />
    </div>
  );
};

export default SinglePage;
