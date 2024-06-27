import React, { useState, useEffect } from 'react';
import Calendar from './Calender';
import EventList from './EventList';
import EventForm from './EventForm';
import { Modal } from 'react-bootstrap';

const App = () => {

  const [events,setEvents]=useState(()=>{
    const saved = localStorage.getItem('events');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [eventDate, setEventDate] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    console.log('Retrieved events from local storage:', storedEvents);
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    console.log('Storing events to local storage:', events);
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleDayClick = (date) => {
    setEventDate(date);
    setShowModal(true);
  };

  const handleSave = (event) => {
    if (selectedEvent) {
      const updatedEvents = events.map((e) => (e === selectedEvent ? event : e));
      setEvents(updatedEvents);
    } else {
      setEvents([...events, { ...event, date: eventDate }]);
    }
    setShowForm(false);
    setShowModal(false);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleDelete = (event) => {
    const updatedEvents = events.filter((e) => e !== event);
    setEvents(updatedEvents);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Calendar onDayClick={handleDayClick} />
        </div>
        <div className="col-md-6">
          {showForm ? (
            <EventForm event={selectedEvent} onSave={handleSave} onCancel={() => setShowForm(false)} />
          ) : (
            <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EventForm event={null} onSave={handleSave} onCancel={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;
