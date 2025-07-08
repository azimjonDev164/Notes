import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { speak } from "../../helper/speaker";
// import party from "party-js";
import confetti from "canvas-confetti";

const handler = () => {
  speak(`Well done! You completed`);
  confetti({
    particleCount: 100,
    shapes: ["circle"],
    emojis: ["🎉", "✨", "🎊", "🔥"],
    scalar: 2,
  });
};

const NoteItem = () => {
  return (
    <div className="card card-side gap-x-4 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg transition-transform">
      <input
        onClick={handler}
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-primary checkbox-lg mt-2"
      />

      <div className="dropdown dropdown-end text-white w-full">
        <div tabIndex={0} role="button" className="w-full">
          <p className="text-base leading-relaxed text-gray-200 hover:text-white transition-colors duration-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            perspiciatis, alias in, dolorem impedit provident atque mollitia
            quis neque consectetur illum delectus quaerat, rem quidem
            exercitationem nemo voluptates eaque modi?
          </p>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-48 bg-white text-gray-800 z-50 rounded-md shadow-lg border border-gray-200"
          >
            <li>
              <a className="flex items-center gap-2 text-[16px] hover:bg-gray-100 px-2 py-1 rounded">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 text-[16px] hover:bg-gray-100 px-2 py-1 rounded">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
