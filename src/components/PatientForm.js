import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const PatientForm = ({createAppointment}) => {

  // Crear State de citas
  const [appointment, updateAppointment] = useState({
    pet: '',
    petOwner: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentDescription: ''
  });

  const [error, updateError] = useState(false);


  // función que se ejecuta cada que un usuario escribe en un input

  const updateState = e => {
    updateAppointment({
      ...appointment,
      [e.target.name]: e.target.value
    })
  }

  // extraer los valores
  const { pet, petOwner, appointmentDate, appointmentTime, appointmentDescription} = appointment;

  // Cuando el usuairo presiona agregar cita
  const submitAppointment = e => {
    e.preventDefault();

    // validar
    if(pet.trim() === '' || petOwner.trim() === '' || appointmentDate.trim() === '' ||
       appointmentTime.trim() === '' || appointmentDescription.trim() === '') {
      updateError(true);
      return;
    }

    // Eliminar el mensaje previo
    updateError(false);

    // asignar un Id
    appointment.id = uuidv4();
    // Crear la cita
    createAppointment(appointment);

    // Reiniciar form

    updateAppointment({
      pet: '',
      petOwner: '',
      appointmentDate: '',
      appointmentTime: '',
      appointmentDescription: ''
    });
  }


  return (
    <Fragment>
      <h2>Crear Cita</h2>
      { error ? <p className="alerta-error">Todos los campos son obligatorios</p>: null}
      <form
        onSubmit={submitAppointment}
      >
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={updateState}
          value={pet}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="petOwner"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={updateState}
          value={petOwner}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="appointmentDate"
          className="u-full-width"
          onChange={updateState}
          value={appointmentDate}
        />

        <label>Hora</label>
        <input
          type="time"
          name="appointmentTime"
          className="u-full-width"
          onChange={updateState}
          value={appointmentTime}
        />

        <label>Síntomas</label>
        <textarea
          name="appointmentDescription"
          className="u-full-width"
          onChange={updateState}
          value={appointmentDescription}
        ></textarea>

        <button
          type="submit"
          className="u-full-width button-primary"
        >Agregar cita</button>
      </form>
    </Fragment>
  );
}

PatientForm.propTypes = {
  createAppointment: PropTypes.func.isRequired
}

export default PatientForm;