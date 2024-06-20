import React from 'react';

const Navbar = () => {
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <a href="/home" className="text-2xl no-underline text-grey-darkest hover:text-black-dark">Home</a>
      </div>
      <div>
        <a href="/login" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">login</a>
        <a href="/signup" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">create Account</a>
        <a href="#" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">change paaword</a>
      </div>
    </nav>
  );
};

export default Navbar;
