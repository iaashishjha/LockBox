import { useState } from 'react' 
import './App.css'
import Navbar from './components/navbar'
import Manager from './components/manager'
import Footer from './components/footer'

function App() { 

  return (
    <>
        <Navbar /> 

        {/* Collection of modern, background snippets :
            Ready-to-use, simply copy and paste into your next project. All snippets crafted with Tailwind CSS and Vanilla CSS for easy integration.
            Website: https://bg.ibelick.com/ */}

        <div className="bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">

       <Manager/> 
        </div>
       <Footer/>
    </>
  )
}

export default App