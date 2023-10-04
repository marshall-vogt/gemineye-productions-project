import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <div>
        <div>
          <h3>Uh oh, we could not find the page you were looking for!</h3>
          <p>
            <Link to="/">Return Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
