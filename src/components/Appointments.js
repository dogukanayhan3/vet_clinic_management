import React, { useState, useEffect } from 'react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ petId: '', serviceType: '', appointmentDate: '' });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppointment),
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input name="petId" placeholder="Pet ID" value={newAppointment.petId} onChange={handleChange} required />
        <input name="serviceType" placeholder="Service Type" value={newAppointment.serviceType} onChange={handleChange} required />
        <input name="appointmentDate" type="date" value={newAppointment.appointmentDate} onChange={handleChange} required />
        <button type="submit">Book Appointment</button>
      </form>
      <h2>Upcoming Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>{`Pet: ${appt.petId}, Service: ${appt.serviceType}, Date: ${appt.appointmentDate}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;