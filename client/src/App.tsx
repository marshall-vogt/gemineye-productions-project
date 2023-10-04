import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import { useState, useEffect } from 'react';
import { readEvents, Event } from './data';
import EventDetails from './pages/EventDetails';
import Checkout from './pages/Checkout';
import AuthPage from './pages/AuthPage';
import AppContext from './components/AppContext';
import { Auth, User } from './lib';
import NotFound from './pages/NotFoundPage';

const tokenKey = 'react-context-jwt';

export default function App() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | undefined>();
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  // Load upcoming events for viewing
  useEffect(() => {
    async function readServerData() {
      try {
        const resp = await readEvents();
        setUpcomingEvents(resp);
      } catch (error) {
        console.error(error);
      }
    }

    readServerData();
  }, []);

  // Store user login info
  useEffect(() => {
    // If user logged in previously on this browser, authorize them
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(auth: Auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
  }

  const contextValue = { user, token, handleSignIn, handleSignOut };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage upcomingEvents={upcomingEvents} />} />
          <Route
            path="/events"
            element={<EventsPage upcomingEvents={upcomingEvents} />}
          />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/sign-up" element={<AuthPage action="sign-up" />} />
          <Route path="/sign-in" element={<AuthPage action="sign-in" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}
