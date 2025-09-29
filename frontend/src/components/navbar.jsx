import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
       <nav className="bg-slate-800 text-white shadow-md">
  <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
    {/* Logo */}
    <div className="text-2xl font-bold tracking-wide">
      <span>Lock</span><span className="text-red-500">box</span>
    </div>

    {/* Navigation Links */}
    <div className="flex items-center gap-6">
      <Link
        to="/profile"
        className="text-black text-lg rounded-3xl hover:text-purple-300 transition duration-200 bg-green-200 px-4"
      >
        Profile
      </Link>

      <a
        href="https://github.com/your-repo"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full ring-1 ring-white transition duration-200"
      >
        <img
          className="invert w-6 h-6"
          src="/icons/github.svg"
          alt="GitHub logo"
        />
        <span className="font-semibold">GitHub</span>
      </a>
    </div>
  </div>
</nav>
    )
}

export default Navbar