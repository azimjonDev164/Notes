import AddFolderItems from "./AddFolderItems";
import FolderItem from "./FolderItem";
import FolderPath from "./FolderPath";

const Folder = () => {
  return (
    <div className="hide-scrollbar h-[84vh]">
      <FolderPath />
      <div className=" margin-auto overflow-y-scroll hide-scrollbar mb-4 h-[73vh] pl-3">
        <div className="flex flex-wrap gap-2">
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
        </div>
      </div>
      <AddFolderItems />
    </div>
  );
};

export default Folder;
