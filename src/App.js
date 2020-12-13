import React, { Fragment, useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import Appointment from './components/Appointment';

function App() {
  // Citas en local storage
  let initialAppointments = JSON.parse(localStorage.getItem('appointments')); // se convierte el string leido de active storage a un arreglo de objetos

  if (!initialAppointments) {
    initialAppointments = [];
  }
  // Arreglos de citas
  const [appointments, saveAppointments] = useState(initialAppointments);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    let initialAppointments = JSON.parse(localStorage.getItem('appointments')); // se convierte el string leido de active storage a un arreglo de objetos

    if(initialAppointments) {
      localStorage.setItem('appointments', JSON.stringify(appointments)); // convierte el arreglo de objetos a string para poder almacenar en el local storage
    } else {
      localStorage.setItem('appointment', JSON.stringify([]));
    }
  }, [appointments]); // se ejecuta cada vez que appointments cambia

  // Función que tome las citas actuales y agregue la nueva
  const createAppointment = appointment => {
    saveAppointments([...appointments, appointment]);
  }

  // Función que elimina una cita por su id
  const deleteAppointment = id => {
    const newAppointsments = appointments.filter(appointment => appointment.id !== id);
    saveAppointments(newAppointsments);
  }

  // Mensaje condicional
  const mainTitle = appointments.length === 0 ? 'No hay citas' : 'Administra tus citas';


  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <PatientForm
              createAppointment={createAppointment}
            />
          </div>
          <div className="one-half column">
            <h2>{mainTitle}</h2>
            {appointments.map(appointment => (
              <Appointment
                key={appointment.id}
                appointment={appointment}
                deleteAppointment={deleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
