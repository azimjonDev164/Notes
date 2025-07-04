import { faUpload, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const AddFolderItems = ({ title }) => {
  const [file, setFile] = useState("");
  const fileRef = useRef(null);

  const handler = () => {
    fileRef.current.click();
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-gray-900 p-4 z-50">
      <div className="flex items-center max-w-[860px] mx-auto">
        {title !== "folder" && (
          <div>
            <FontAwesomeIcon
              icon={faUpload}
              onClick={handler}
              className="cursor-pointer text-white text-xl"
            />
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.value)}
            />
          </div>
        )}
        <input
          type="text"
          placeholder="Add"
          className="flex-1 ml-4 min-w-0 outline-none text-[17px] bg-gray-800 text-white rounded px-3 py-1"
        />
        <FontAwesomeIcon
          icon={faFileCirclePlus}
          className="text-yellow-400 cursor-pointer text-xl ml-3"
        />
      </div>
    </div>
  );
};

export default AddFolderItems;
