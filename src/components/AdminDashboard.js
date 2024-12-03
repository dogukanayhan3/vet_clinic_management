import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/admin/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>All Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>{`Pet: ${appt.petId}, Service: ${appt.serviceType}, Date: ${appt.appointmentDate}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;