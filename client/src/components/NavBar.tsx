import { Outlet, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import AppContext from './AppContext';
import Footer from './Footer';
import Hamburger from 'hamburger-react';
import ModalMenu from './ModalMenu';

export default function NavBar() {
  const { user, handleSignOut } = useContext(AppContext);
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="h-[7vh] border rounded-md bg-[#310a5d]">
        <nav className="flex h-full justify-between">
          <div className="flex items-center w-[33vw] justify-between">
            <h2 className="w-full md:text-xl font-bold text-white ml-10 md:ml-20 font-serif">
              Gemineye Productions
            </h2>
          </div>
          <div className="sm:flex items-center justify-around w-[66vw] hidden sm:text-xs md:text-sm lg:text-base 2xl:text-lg">
            <Link to="/">
              <button className="bg-gray-200 hover:bg-gray-300 w-[10vw] h-[4vh] rounded-xl">
                Home
              </button>
            </Link>
            <Link to="/events">
              <button className="hover:bg-gray-300 bg-gray-200 w-[10vw] h-[4vh] rounded-xl">
                Events
              </button>
            </Link>
            {user && (
              <>
                <Link to="/user-tickets">
                  <button className="bg-gray-200 hover:bg-gray-300 w-[10vw] h-[4vh] rounded-xl">
                    My Tickets
                  </button>
                </Link>
                <button
                  className="bg-gray-200 hover:bg-gray-300 w-[10vw] h-[4vh] rounded-xl"
                  onClick={handleSignOut}>
                  Sign-Out
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/sign-in">
                  <button className="bg-gray-200 hover:bg-gray-300 w-[10vw] h-[4vh] rounded-xl">
                    Sign-In
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button className="bg-gray-200 hover:bg-gray-300 w-[10vw] h-[4vh] rounded-xl">
                    Sign-Up
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="sm:hidden">
            <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} />
          </div>
        </nav>
      </div>
      <Outlet />
      <div className="bottom-0 left-0 fixed w-full">
        <Footer />
      </div>
      {isOpen && (
        <ModalMenu
          isOpen={isOpen}
          setOpen={setOpen}
          user={user}
          handleSignOut={handleSignOut}
        />
      )}
    </div>
  );
}
