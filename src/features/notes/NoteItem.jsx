import {
  faEdit,
  faMicrophone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { speak } from "../../helper/speaker";
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

const NoteItem = ({ note, getNotes, click }) => {
  const [editNote, setEditNote] = useState({
    id: null,
    content: "",
    completed: false,
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleCompletionToggle = async () => {
    try {
      const newCompleted = !note.completed;
      await axios.patch(`${BASE_URL}/notes/${note.id}`, {
        content: note.content,
        completed: newCompleted,
      });
      await getNotes();
      click(); // optional: for animation or state update
      if (newCompleted) handler();
    } catch (err) {
      console.error("Completion toggle failed:", err);
    }
  };

  const editNotes = async (id, e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BASE_URL}/notes/${id}`, {
        content: editNote.content,
        completed: editNote.completed,
      });
      setEditNote({ id: null, content: "", completed: false });
      await getNotes();
      click(); // optional
    } catch (error) {
      console.log("Edit failed:", error.response?.data || error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`);
      await getNotes();
    } catch (err) {
      console.error("Delete note failed:", err);
    }
  };

  return (
    <div className="card card-side gap-x-4 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg">
      <input
        type="checkbox"
        onChange={handleCompletionToggle}
        checked={note?.completed}
        disabled={editNote.id === note.id}
        className="checkbox checkbox-primary checkbox-lg mt-2"
      />

      <div className="flex flex-row items-center w-full text-white">
        {editNote.id === note.id ? (
          <form
            onSubmit={(e) => editNotes(note.id, e)}
            className="flex-1 flex items-center gap-2 px-2 py-1 bg-transparent rounded-lg"
          >
            <input
              type="text"
              onChange={(e) =>
                setEditNote({ ...editNote, content: e.target.value })
              }
              value={editNote.content}
              placeholder="Edit note"
              className="bg-transparent text-white border-b border-yellow-400 outline-none w-full focus:ring-0 text-sm"
            />
          </form>
        ) : (
          <p
            className={`text-base flex-1 leading-relaxed text-gray-200 hover:text-white transition-colors duration-300 ${
              note.completed ? "line-through" : ""
            }`}
          >
            {note?.content}
          </p>
        )}

        <div className="dropdown dropdown-end mt-2">
          <label tabIndex={0} className="btn btn-warning btn-xs text-white">
            <FontAwesomeIcon icon={faEdit} /> Options
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-2 z-[100] bg-base-100 rounded-box w-52 shadow"
          >
            <li
              onClick={() =>
                setEditNote({
                  id: note.id,
                  content: note.content,
                  completed: note.completed,
                })
              }
            >
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
                <FontAwesomeIcon icon={faMicrophone} /> Speak
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
