import React, { useState } from 'react';

const EventForm = ({ event, onSave, onCancel }) => {
  const [eventData, setEventData] = useState(event || { name: '', type: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(eventData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Event Name</label>
        <input type="text" className="form-control" name="name" value={eventData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Event Type</label>
        <select className="form-control" name="type" value={eventData.type} onChange={handleChange} required>
          <option value="">Select type</option>
          <option value="Meeting">Meeting</option>
          <option value="Reminder">Reminder</option>
          <option value="Birthday">Birthday</option>
          <option value="Task">Task</option>
        </select>
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea className="form-control" name="description" value={eventData.description} onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EventForm;
