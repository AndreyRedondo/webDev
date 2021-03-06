import { hot } from 'react-hot-loader/root';
import React, { Fragment, useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {

  // Revisa si hay citas en Local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales){
    citasIniciales = '';
  }

  // Arreglo de citas
  const [citas, guardarCitas] = useState([citasIniciales])

  // Use Effect
  useEffect ( () =>{
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }
  }, [citas] );

  // Funcion que tome las citas actuales y agregue las nuevas
  const crearCita = cita => {
    guardarCitas([...citas, cita])

  }

  // Funcionque elimina una cita por su id
  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
);
    


}

export default hot(App);
