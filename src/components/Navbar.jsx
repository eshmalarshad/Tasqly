import React from 'react'

const Navbar = () => {
  return (
  <nav className='flex justify-between items-center px-8 md:px-20 py-4 bg-[#ede9fe]/80 backdrop-blur-md border-b border-violet-100 shadow-sm'>

  <div className="logo">
    <span className='font-bold text-2xl text-violet-900 tracking-tight'>
      Tasqly
    </span>
  </div>

  <ul className="flex gap-8 text-violet-700 font-medium">
    <li className='cursor-pointer hover:text-violet-900 transition-all duration-300'>
      Home
    </li>

    <li className='cursor-pointer hover:text-violet-900 transition-all duration-300'>
      Your Tasks
    </li>
  </ul>

</nav>
  )
}

export default Navbar
