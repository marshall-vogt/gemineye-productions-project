import { Outlet, Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <div>
      <div className="navbar">
        <nav>
          <h2>Gemineye Productions</h2>
          <button>
            <Link to="/">Home</Link>
          </button>
          <button>
            <Link to="/events">Events</Link>
          </button>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
