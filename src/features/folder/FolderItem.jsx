import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
const FolderItem = () => {
  return (
    <div className="card card-side items-center px-3 h-[80px] w-[300px] transition-transform duration-200 hover:scale-103 bg-gray-900 shadow-md shadow-gray-700 cursor-pointer ">
      <FontAwesomeIcon icon={faFolder} className="text-yellow-400 text-4xl" />
      <div className="card-body">
        <h2 className="card-title">Lorem, ipsum dolor.</h2>
        <p>13:09:2025</p>
      </div>
    </div>
  );
};

export default FolderItem;
