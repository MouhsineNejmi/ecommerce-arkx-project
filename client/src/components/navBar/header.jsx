import logo from "../../assets/lightLogo.svg";
import { useState } from "react";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  
  return (
    <nav className="max-w-6xl mx-auto">
      <div className="flex gap-5 items-center p-3">
        <a href="#" className="flex items-center">
          <img src={logo} className="  h-8 mr-3" alt="logo" />
        </a>
        <div>
          <button
            type="button"
            className=" text-white bg-[#2763ff] hover:bg-[#008DFA] font-medium rounded-2xl text-sm px-5 py-2.5 text-center inline-flex items-center "
            onClick={toggleDropdown}
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 19 19"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="em"
                viewBox="0 0 24 24"
                fontSize="60px"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M17 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM3 17a4 4 0 1 1 8 0a4 4 0 0 1-8 0Zm10-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5ZM3 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </svg>
            Category
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 p-2 bg-gray-200 border border-gray-300 rounded-lg z-10">
              <ul>
                <li>
                  <button
                    onClick={() => console.log("Phones selected")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Phones
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => console.log("Computers selected")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Computers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => console.log("Smart Watches selected")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Smart Watches
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => console.log("Cameras selected")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Cameras
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => console.log("Headphones selected")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Headphones
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => console.log("Gaming selected")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Gaming
                  </button>
                </li>
                
              </ul>
            </div>
          )}
        </div>
        <form className="flex items-center flex-1">
          <label className="sr-only">Search</label>
          <div className="flex relative w-[500px] mx-auto border border-gray-300 rounded-2xl">
            <input
              type="text"
              id="search"
              className="flex-1 rounded-2xl bg-gray-50  text-sm "
              placeholder="     Search ..."
              required
            />
            <button
              type="submit"
              className="p-2.5   text-sm font-medium text-white bg-[#2763ff] hover:bg-[#008DFA] rounded-2xl "
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </form>
        <button type="button" className="text-gray-700   ">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.388 2.25t-1.362 2.412q-.975 1.313-2.625 2.963T13.45 19.7L12 21Z"
            />
          </svg>
        </button>
        <button type="button" className="text-gray-700   ">
          <svg
            className="w-4 h-4 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M3 2a1 1 0 0 0 0 2h1.074l.16 2.077l.616 8.017a3 3 0 0 0 3.205 2.762l10.355-.74a3 3 0 0 0 2.768-2.661l.816-7.345A1 1 0 0 0 21 5H6.157l-.16-2.077A1 1 0 0 0 5 2H3Zm4 18.5A1.5 1.5 0 0 1 8.5 19h.01a1.5 1.5 0 0 1 1.5 1.5v.01a1.5 1.5 0 0 1-1.5 1.5H8.5a1.5 1.5 0 0 1-1.5-1.5v-.01ZM17.5 19a1.5 1.5 0 0 0-1.5 1.5v.01a1.5 1.5 0 0 0 1.5 1.5h.01a1.5 1.5 0 0 0 1.5-1.5v-.01a1.5 1.5 0 0 0-1.5-1.5h-.01Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          type="button"
          className="text-black border bg-[#f7f7f7] hover:bg-[#2763ff]/90 focus:outline-none font-medium rounded-2xl text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#008DFA]/55"
        >
          <svg
            className="w-4 h-4 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <circle cx="12" cy="6" r="4"></circle>
              <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"></path>
            </g>
          </svg>
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default Header;
