import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Copmponents/HeaderCopmponent/Header';

const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Root;
