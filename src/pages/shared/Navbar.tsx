/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import { HiUserCircle } from 'react-icons/hi';
import { BiCaretDown } from 'react-icons/bi';
import logo from '../../images/logo.png';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(
    !window.matchMedia(`(min-width: 1280px)`).matches
  );
  // const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    const cleanup = () =>
      window.addEventListener('resize', () => {
        setIsMobile(!window.matchMedia(`(min-width: 1280px)`).matches);
        setProfile(false);
        setShow(false);
      });

    return () => cleanup();
  }, []);

  const logoItem = (
    <Link to="/">
      <img
        src={logo}
        alt="aquanotes logo"
        className="w-16 h-16 mx-auto"
        width="64"
        height="64"
        decoding="async"
      />
    </Link>
  );

  const menuItems = (
    <>
      <li className="">
        <Link to="/" className="cursor-pointer flex items-center">
          {isMobile && <FaHome className="text-indigo-700 w-6 h-6" />}
          <span className=" hover:text-indigo-700 xl:text-base text-base ml-3">
            Home
          </span>
        </Link>
      </li>
      <li className="">
        <Link to="/dashboard" className="cursor-pointer flex items-center">
          {isMobile && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 md:w-8 md:h-8 text-indigo-700"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x={4} y={4} width={6} height={6} rx={1} />
              <rect x={14} y={4} width={6} height={6} rx={1} />
              <rect x={4} y={14} width={6} height={6} rx={1} />
              <rect x={14} y={14} width={6} height={6} rx={1} />
            </svg>
          )}
          <span className=" hover:text-indigo-700 xl:text-base text-base ml-3">
            Dashboard
          </span>
        </Link>
      </li>
    </>
  );

  const profileMenuItems = (
    <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal p-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
      <button
        type="button"
        className="flex items-center"
        // onClick={userLogOut}
      >
        <IoMdExit className="w-5 h-5" />
        <span className="ml-2">Log Out</span>
      </button>
    </li>
  );
  const profileDropdown = (
    <div className="group relative flex flex-grow flex-wrap isolate z-auto">
      {'' ? (
        <>
          <button
            type="button"
            // title={user?.displayName}
            className="flex flex-grow justify-center items-center w-10 h-10 rounded"
          >
            {/* {user?.photoURL ? (
              <img
                className="rounded-full ring-2 w-10 h-10 aspect-square object-cover"
                src={user?.photoURL}
                alt={user?.displayName}
                loading="lazy"
                width={40}
                height={40}
                fetchpriority="low"
                decoding="async"
                onError={(ev) => {
                  ev.target.src =
                    "data:image/svg+xml,%3Csvg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 496 512' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z'%3E%3C/path%3E%3C/svg%3E";
                }}
              /> */}
            ) : (
            <HiUserCircle className="w-10 h-10 text-blue-400 transition-colors hover:text-indigo-600" />
            )
            <span className="text-xs ml-2 capitalize flex flex-col gap-1 items-center">
              {/* <span className="">{user?.displayName}</span> */}
              <BiCaretDown className=" text-blue-400 hover:text-indigo-600" />
            </span>
          </button>

          <nav className="border bg-white invisible border-gray-800 w-40 absolute right-0 top-full transition-all opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-1 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
            <ul className="flex flex-col gap-2">{profileMenuItems}</ul>
          </nav>
        </>
      ) : (
        <Link
          to="/login"
          className="inline-flex items-center justify-center w-full px-4 py-2 capitalize font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-lg hover:bg-orange-600 focus:bg-orange-600"
        >
          log in
        </Link>
      )}
    </div>
  );
  const searchItem = (
    <div className="relative w-full isolate">
      {/* <div className="absolute ml-3 inset-0 m-auto w-4 h-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-search"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx={10} cy={10} r={7} />
          <line x1={21} y1={21} x2={15} y2={15} />
        </svg>
      </div>
      <input
        className="border border-indigo-400 focus:outline-none focus:border-indigo-700 w-full rounded text-sm bg-gray-50 pl-8 pr-4 py-2 xl:max-w-lg xl:w-full"
        type="search"
        placeholder="Search products"
        onChange={throttle(makeProductSearch, 1000)}
      />
      <div className="absolute top-full left-0 w-full h-auto z-0 flex flex-col gap-1 mt-1">
        {searchedProducts.length >= 1 &&
          searchedProducts.map((product) => (
            <Link
              key={product._id}
              to={`/categories/${product.category.split(' ').pop()}`}
              className="bg-slate-300 p-1 rounded"
              onClick={() => {
                setSearchedProducts([]);
              }}
            >
              {product.productName.toLowerCase()}
            </Link>
          ))}
      </div> */}
    </div>
  );
  const notificationsDropdown = (
    <div className="group relative flex isolate z-10">
      <button type="button" title="notifications" className="w-6 h-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-bell"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </svg>
      </button>
      <nav className="border bg-white invisible border-gray-800 w-40 absolute top-full transition-all opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-1 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 p-2">
        <ul className="flex flex-col gap-2">
          <li>No notifications for now 🔕</li>
        </ul>
      </nav>
    </div>
  );
  return (
    <nav className="sticky top-0 w-full isolate z-20">
      <div className="bg-gray-50 h-full w-full">
        {/* Code block starts */}
        <nav className="w-full mx-auto hidden xl:block bg-gray-50 shadow py-1">
          <div className="container px-4 justify-between h-16 flex items-center lg:items-stretch mx-auto">
            <div className="h-full flex items-center">
              <div className="mr-10 flex items-center">{logoItem}</div>
              <ul className="pr-12 xl:flex items-center h-full hidden">
                {menuItems}
              </ul>
            </div>
            <div className="h-full xl:flex xl:w-full xl:max-w-xl items-center justify-end hidden">
              <div className="w-full h-full flex items-center gap-8">
                <div className="flex-grow-[2] h-full flex items-center">
                  {searchItem}
                </div>
                <div className="flex-grow h-full flex items-center gap-4">
                  {notificationsDropdown}
                  {profileDropdown}
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Navbar */}
        <nav>
          <div className="p-4 w-full flex xl:hidden justify-between items-center bg-gray-50 sticky top-0 z-40 shadow">
            <div className="">{logoItem}</div>
            {/* <div> */}
            <button
              type="button"
              id="menu"
              className=""
              onClick={() => setShow(!show)}
            >
              {show ? (
                ' '
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-menu-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1={4} y1={6} x2={20} y2={6} />
                  <line x1={4} y1={12} x2={20} y2={12} />
                  <line x1={4} y1={18} x2={20} y2={18} />
                </svg>
              )}
            </button>
            {/* </div> */}
          </div>

          {/* Mobile responsive sidebar */}
          <div
            className={`fixed xl:hidden w-full h-full transition-transform transform z-40 top-0  ${
              show ? ' -translate-x-0 ' : '-translate-x-full'
            }`}
            id="mobile-nav"
          >
            <div
              className="bg-indigo-500 opacity-50 w-full h-full"
              onClick={() => setShow(!show)}
            />
            <div className="w-64 z-40 fixed overflow-y-auto top-0 bg-gray-50 shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
              <div className="px-4 h-full">
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="mt-4 flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">{logoItem}</div>
                        <div
                          id="cross"
                          className=""
                          onClick={() => setShow(!show)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-x"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <ul className="py-8">{menuItems}</ul>
                  </div>
                  <div className="w-full pt-4">
                    <div className="flex justify-center mb-4 w-full">
                      {searchItem}
                    </div>

                    <div className="border-t border-gray-800">
                      <div className="w-full flex items-center justify-between pt-1 gap-2">
                        <ul className="flex">
                          <li className="cursor-pointer  ">
                            {notificationsDropdown}
                          </li>
                        </ul>
                        {profileDropdown}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Sidebar ends */}

        {/* Code block ends */}
      </div>
    </nav>
  );
};

export default Navbar;
