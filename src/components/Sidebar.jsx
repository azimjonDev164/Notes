const Sidebar = () => {
  return (
    <div className="resize-x overflow-auto bg-gray-900 text-white w-64 min-w-[12rem] max-w-[80vw] mt-0">
      <div className="mt-2mr-1 flex">
        <label className="input bg-gray-900 border-white w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="grow" placeholder="Search" />
          <kbd className="kbd kbd-sm text-black">⌘</kbd>
          <kbd className="kbd kbd-sm text-black">K</kbd>
        </label>
      </div>
      <ul className="menu rounded-box w-full">
        <li>
          <details open>
            <summary>Parent</summary>
            <ul>
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
