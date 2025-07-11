import { faFolder, faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const FolderPath = ({ folder = {}, file = {} }) => {
  const navigate = useNavigate();
  return (
    <div className="breadcrumbs text-xl bg-gray-900 border-t border-yellow-700 mb-3 sticky top-0 hide-scrollbar pl-4 z-40">
      <ul>
        {folder?.title ? (
          <li
            onClick={() => navigate(`/folder/${folder.id}`)}
            key={folder.id || idx}
          >
            <a>
              <FontAwesomeIcon
                icon={faFolder}
                className="text-yellow-400 mr-1"
              />
              {folder.title || "Untitled Folder"}
            </a>
          </li>
        ) : (
          <p>Loading...</p>
        )}

        {file?.title && (
          <li>
            <a>
              <FontAwesomeIcon
                icon={faNotesMedical}
                className="text-yellow-400 mr-1"
              />
              {file.title}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FolderPath;
