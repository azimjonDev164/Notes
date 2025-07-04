import AddFolderItems from "./AddFolderItems";
import FolderItem from "./FolderItem";
import FolderPath from "./FolderPath";

const Folder = () => {
  return (
    <div className="hide-scrollbar h-[84vh]">
      <FolderPath />
      <div className="flex flex-wrap gap-2 margin-auto overflow-y-scroll hide-scrollbar mb-4 h-[68vh] pl-3">
        <FolderItem />
        <FolderItem />
        <FolderItem />
      </div>
      <AddFolderItems title={"folder"} />
    </div>
  );
};

export default Folder;
