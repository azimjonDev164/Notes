import AddFolderItems from "./AddFolderItems";
import FolderPath from "./FolderPath";

const SinglePage = () => {
  return (
    <div className="hide-scrollbar h-[84vh]">
      <FolderPath />
      <div className="flex flex-wrap gap-2 margin-auto overflow-y-scroll hide-scrollbar mb-4 h-[68vh] pl-3"></div>
      <AddFolderItems />
    </div>
  );
};

export default SinglePage;
