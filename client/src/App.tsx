import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import { useState, useEffect } from 'react';
import { readEvents, Event } from './data';
import EventDetails from './pages/EventDetails';
import Checkout from './pages/Checkout';

export default function App() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | undefined>();
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

  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<HomePage upcomingEvents={upcomingEvents} />} />
        <Route
          path="/events"
          element={<EventsPage upcomingEvents={upcomingEvents} />}
        />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}
