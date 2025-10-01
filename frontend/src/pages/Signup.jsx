import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        company: '',
        agency: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setSignupInfo({ ...signupInfo, agency: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("Form values:", signupInfo);
        const { name, email, contact, password, company, agency } = signupInfo;
        if (!name || !email || !password || !contact || !company || !agency) {
            return alert('Fill all required fields');
        }
        try {
            const url = `https://lock-box-server.vercel.app/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                alert(message);
                console.log("Signup response:", result);
                setTimeout(() => {
                    navigate('/login')

                }, 1000)

            } else if (error) {
                console.log("Raw result:", result);
                const details = error?.details?.[0]?.message || error;
                alert(details);
            } else {
                alert(message);
            }
            console.log(result);
        } catch (err) {
            
                console.error("Signup error:", err);
                alert("Something went wrong.");
            
        }

    };




    return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-green-50 px-4">
  <div className="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden">
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-2">
        Create your <span className="text-red-500">LockBox</span> account
      </h1>
      <p className="text-gray-600 text-sm">Securely manage your passwords with ease</p>
    </div>

    <form className="px-6 pb-6 flex flex-col gap-4" onSubmit={handleSignup} noValidate>
      <div>
        <label className="block text-sm text-purple-700 mb-1">Full Name</label>
        <input
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          name="name"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-purple-700 mb-1">Phone Number</label>
        <input
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="tel"
          name="contact"
          required
        />
      </div>

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

      <div>
        <label className="block text-sm text-purple-700 mb-1">Company Name</label>
        <input
          onChange={handleChange}
          placeholder="Enter company name"
          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          name="company"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-700 mb-2">
          Are you an Agency? <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              className="accent-purple-700"
              type="radio"
              value="Yes"
              name="isAgency"
              onChange={handleOptionChange}
              checked={selectedOption === 'Yes'}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              className="accent-purple-700"
              type="radio"
              value="No"
              name="isAgency"
              onChange={handleOptionChange}
              checked={selectedOption === 'No'}
            />
            No
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="bg-purple-700 hover:bg-purple-800 text-white rounded-full py-3 transition duration-200"
      >
        Create Account
      </button>
    </form>

    <div className="text-center pb-6">
      <Link to="/login" className="text-sm text-purple-600 hover:underline">
        Already Registered? <span className="font-semibold">Login</span>
      </Link>
    </div>
  </div>
</div>
    )
}

export default Signup