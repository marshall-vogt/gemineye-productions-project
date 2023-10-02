import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import { useState, useEffect } from 'react';
import { readEvents, Event } from './data';

export default function App() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | undefined>();
  useEffect(() => {
    async function readServerData() {
      try {
        const resp = await readEvents();

        console.log('serverData:', resp);

        setUpcomingEvents(resp);
      } catch (error) {
        console.error(error);
      }
    }

    readServerData();
  }, [setUpcomingEvents]);

  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<HomePage upcomingEvents={upcomingEvents} />} />
        <Route
          path="/events"
          element={<EventsPage upcomingEvents={upcomingEvents} />}
        />
      </Route>
    </Routes>
  );
}
