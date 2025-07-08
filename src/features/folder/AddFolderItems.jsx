import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const AddFolderItems = ({ title }) => {
  const [file, setFile] = useState("");
  const fileRef = useRef(null);

  const handler = () => {
    fileRef.current.click();
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-gray-900 px-4 py-3 border-t border-gray-700 z-50">
      <div className="flex items-center max-w-[860px] mx-auto gap-3">
        <input
          type="text"
          placeholder="Title..."
          className="flex-1 min-w-0 bg-gray-800 text-white text-[16px] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        />

        <FontAwesomeIcon
          icon={faFileCirclePlus}
          className="text-yellow-400 text-2xl cursor-pointer hover:text-yellow-300 transition-colors duration-200"
        />
      </div>
    </div>
  );
};

export default AddFolderItems;
