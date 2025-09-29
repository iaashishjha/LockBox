import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [LoginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...LoginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = LoginInfo;
        if (!email || !password) {
            return alert('fill the required fields');
        }
        try {
            const url = `http://localhost:5000/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, email, error } = result;
            if (success) {
                alert(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('loggedInUserEmail', email);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                alert(details);
            } else if (!success) {
                alert(message);
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-green-50 px-4">
  <div className="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden">
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-2">
        Login to your <span className="text-red-500">LockBox</span> account
      </h1>
      <p className="text-gray-600 text-sm">Securely manage your passwords</p>
    </div>

    <form className="px-6 pb-6 flex flex-col gap-4" onSubmit={handleLogin}>
      <div>
        <label className="block text-sm text-purple-700 mb-1">Email Address</label>
        <input
          onChange={handleChange}
          placeholder="Enter email address"
          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="email"
          name="email"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-purple-700 mb-1">Password</label>
        <input
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
          name="password"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-purple-700 hover:bg-purple-800 text-white rounded-full py-3 transition duration-200"
      >
        Login
      </button>
    </form>

    <div className="text-center pb-6">
      <Link to="/signup" className="text-sm text-purple-600 hover:underline">
        Don’t have an account? <span className="font-semibold">Create Account</span>
      </Link>
    </div>
  </div>
</div>
    )
}

export default Login