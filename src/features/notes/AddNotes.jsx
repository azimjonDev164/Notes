import { faUpload, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRef, useState } from "react";

const AddNote = ({ fileId, getNotes, clickHandler }) => {
  const [file, setFile] = useState("");
  const [content, setCotent] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fileRef = useRef(null);

  const handler = () => {
    fileRef.current.click();
  };

  const addNewNote = async () => {
    try {
      if (content && fileId) {
        await axios.post(`${BASE_URL}/notes`, {
          content,
          type: "string",
          completed: false,
          fileId,
        });
        await getNotes();
        setCotent("");
        clickHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-gray-900 px-4 py-3 border-t border-gray-700 z-50">
      <div className="flex items-center max-w-[860px] mx-auto gap-3">
        <textarea
          placeholder="Write a note..."
          rows={1}
          value={content}
          onChange={(e) => setCotent(e.target.value)}
          className="flex-1 resize-none min-w-0 bg-gray-800 text-white text-[16px] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        />

        <FontAwesomeIcon
          icon={faPlus}
          onClick={addNewNote}
          className="text-yellow-400 text-2xl cursor-pointer hover:text-yellow-300 transition-colors duration-200"
        />
      </div>
    </div>
  );
};

export default AddNote;
