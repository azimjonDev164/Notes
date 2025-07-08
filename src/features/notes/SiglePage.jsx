import FolderPath from "../folder/FolderPath";
import AddNote from "./AddNotes";
import NoteItem from "./NoteItem";

const SinglePage = () => {
  return (
    <div className="hide-scrollbar h-[84vh]">
      <FolderPath />
      <div className=" margin-auto overflow-y-scroll hide-scrollbar mb-4 h-[68.5vh] px-3 py-4">
        <div className="flex flex-col gap-y-4">
          <NoteItem />
          <NoteItem />
          <NoteItem />
          <NoteItem />
        </div>
      </div>
      <AddNote />
    </div>
  );
};

export default SinglePage;
