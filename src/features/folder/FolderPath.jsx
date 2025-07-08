import { faFolder, faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FolderPath = () => {
  return (
    <div className="breadcrumbs text-xl bg-gray-900 border-t border-yellow-700 mb-3 sticky top-0 hide-scrollbar pl-4 z-40">
      <ul>
        <li>
          <a>
            <FontAwesomeIcon icon={faFolder} className="text-yellow-400" />
            Home
          </a>
        </li>
        <li>
          <a>
            <FontAwesomeIcon
              icon={faNotesMedical}
              className="text-yellow-400"
            />
            Add Notes
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FolderPath;
