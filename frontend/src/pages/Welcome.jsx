import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-green-50 px-4">
  <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-2">Welcome to <span className="text-red-500">LockBox</span></h1>
      <p className="text-gray-600 text-lg">Your Own Password Manager</p>
    </div>
    <div className="px-6 pb-6 flex flex-col gap-4">
      <Link
        to="/login"
        className="bg-purple-700 hover:bg-purple-800 text-white text-center py-3 rounded-full transition duration-200"
      >
        Already Registered? Login
      </Link>
      <Link
        to="/signup"
        className="bg-purple-100 hover:bg-purple-200 text-purple-700 text-center py-3 rounded-full transition duration-200"
      >
        Create Account
      </Link>
    </div>
  </div>
</div>
  )
}

export default Home

