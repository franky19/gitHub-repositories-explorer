/** @format */

import { useState, useRef, useEffect } from "react";
import Repos from "./Repos";

export default function Dropdown({
  avatar_url,
  username,
}: {
  avatar_url: string;
  username: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="inline-flex justify-between items-center w-48 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 !w-full"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button">
        <div className="flex gap-2 items-center">
          <img
            src={avatar_url}
            alt={username}
            className="w-8 h-8 rounded-full"
          />
          <span>{username}</span>
        </div>
        <svg
          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className=" mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 w-full right-0">
          <Repos username={username} />
        </div>
      )}
    </div>
  );
}
