import { UserButton } from '@clerk/nextjs'
import React from 'react'

const NavBar = () => {
  return (
    <div className='flex justify-between p-3 px-10 border-b-[1px] shadow-sm'>
      <div className="logo h-8 px-2 rounded-md flex justify-center align-middle font-bold text-2xl bg-yellow-400 ">TAXI-GO</div>
      <div className="  list hidden md:flex gap-5">
        <h2>Home</h2>
        <h2>History</h2>
        <h2>Help</h2>
      </div>
      <UserButton afterSignOutUrl='/'/>

    </div>
  )
}

export default NavBar
