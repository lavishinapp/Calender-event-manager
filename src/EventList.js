import React from 'react';

const EventList = ({ events, onEdit, onDelete }) => {
  return (
    <div>
      <h2>My Calender Items</h2>
      <ul className="list-group">
        {events.map((event, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            <span>{event.name}</span>
            <div>
              <button className="btn btn-warning btn-sm mr-2" onClick={() => onEdit(event)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(event)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
