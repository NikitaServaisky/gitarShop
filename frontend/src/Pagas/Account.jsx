import React from 'react'
import { Outlet } from 'react-router-dom'

const Account = () => {
  return (
    <>
      <div>Account</div>
      <Outlet />
    </>
  );
}

export default Account