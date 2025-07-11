import {
  faEdit,
  faMicrophone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { speak } from "../../helper/speaker";
// import party from "party-js";
import confetti from "canvas-confetti";
import { useState } from "react";
import axios from "axios";

const handler = () => {
  speak(`Well done! You completed`);
  confetti({
    particleCount: 100,
    shapes: ["circle"],
    emojis: ["🎉", "✨", "🎊", "🔥"],
    scalar: 2,
  });
};
const BASE_URL = "http://localhost:3000";

const NoteItem = ({ note, getNotes }) => {
  const [editNote, setEditNote] = useState({});

  const editNotes = async () => {
    try {
    } catch (error) {}
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`);
      await getNotes();
    } catch (err) {
      console.error("Delete folder failed:", err);
    }
  };

  return (
    <div className="card card-side gap-x-4 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg">
      <input
        onClick={handler}
        type="checkbox"
        defaultChecked={note?.completed}
        className="checkbox checkbox-primary checkbox-lg mt-2"
      />

      <div className="flex flex-row items-center w-full text-white">
        <p
          className={`text-base flex-1 leading-relaxed text-gray-200 hover:text-white transition-colors duration-300 ${
            note.completed ? "line-through" : ""
          }`}
        >
          {note?.content}
        </p>

        <div className="dropdown dropdown-end mt-2">
          <label tabIndex={0} className="btn btn-warning btn-xs text-white">
            <FontAwesomeIcon icon={faEdit} /> Options
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-2 z-[100] bg-base-100 rounded-box w-52 shadow"
          >
            <li>
              <a className="text-gray-700 hover:text-yellow-500">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </a>
            </li>
            <li onClick={() => deleteNote(note?.id)}>
              <a className="text-gray-700 hover:text-red-500">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </a>
            </li>
            <li onClick={() => speak(note?.content)}>
              <a className="text-gray-700 hover:text-green-500">
                <FontAwesomeIcon icon={faMicrophone} /> speak
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
