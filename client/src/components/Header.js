import NavLink from './NavLink.js';
import logo from '../static/images/random_icon.png';

const navLinks = ["kittens", "bunnies", "bubbles!"]

const Header = () => {
  return (
    <div className="items-center justify-between flex w-full space-x-4 pb-3 pt-4 px-3">
      <div className="border-b border-gray-200 w-[25%] flex md:space-x-2 md:pb-6 pb-2 items-center justify-center md:justify-start">
        <img
          className="md:w-12 md:h-12 w-10 h-10"
          src={logo}
          alt="Bubble Logo"
        />
        <h1 className="self-center hidden md:inline md:font-bold md:text-xl text-md">
          Bubble
        </h1>
      </div>
      <div className="border b pb-5 border-gray-200 w-[140%] items-center justify-center flex space-x-2">
        {navLinks.map((link) => (
          <div className="relative items-center justify-center flex">
            <NavLink title={link} key={link} />
          </div>
        ))}

      </div>
    </div>
  )
}

export default Header;