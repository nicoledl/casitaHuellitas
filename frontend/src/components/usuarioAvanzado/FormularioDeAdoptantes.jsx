import { useForm } from 'react-hook-form'
import axios from 'axios'
import Modal from '../commons/Modal'
import { Col, Row } from 'react-grid-system'

const titulo = <span style={{ fontFamily: "'Pacifico', cursive", fontSize: 'clamp(3rem, -5.3vw + 5.3rem, 2rem)', color: '#2dc5a4' }}>¡Es hoy, es hoy!</span>

const FormularioDeAdoptantes = ({ estiloDeBoton, mascota }) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = async datos => {
    try {
      const response = await axios.post('http://localhost:3001/api/adoptantes', datos, { withCredentials: true })
      if (response.status === 200) {
        await axios.delete(`http://localhost:3001/api/mascotas/${mascota._id}`)
        console.log('Datos enviados y mascota eliminada exitosamente')
      } else {
        console.error('Error al enviar los datos:', response.data)
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error)
    }
  }
  const date = new Date().toLocaleString()

  const formularioAdoptate = () => {
    return (
      <form id='formulario-adoptante' onSubmit={handleSubmit(onSubmit)}>
        <h3>Datos del Adoptante</h3>
        <Row>
          <Col sm={6}>
            <input type='text' placeholder='Nombre' {...register('name', { required: true, maxLength: 100 })} />
          </Col>
          <Col sm={6}>
            <input type='text' placeholder='Apellido' {...register('lastname', { required: true, maxLength: 100 })} />
          </Col>
          <Col sm={6}>
            <input type='text' placeholder='D.N.I.' maxLength={11} pattern='[0-9]*' {...register('dni', { required: true, maxLength: 11 })} />
          </Col>
          <Col sm={6}>
            <input type='tel' placeholder='Teléfono' {...register('phone', { required: false, maxLength: 100 })} />
          </Col>
          <Col sm={12}>
            <input type='email' placeholder='Mail' {...register('email', { required: false, maxLength: 100 })} />
          </Col>
          <Col>
            <input type='text' placeholder='Direccion' {...register('address', { required: false, maxLength: 100 })} />
          </Col>
          <input type='hidden' value={date} {...register('date', {})} />
          <input type='hidden' value={mascota._id} {...register('pet', {})} />
          <Col sm={12}>
            <button className='boton-submit'>Enviar</button>
          </Col>
        </Row>
      </form>
    )
  }

  return (
    <Modal titulo={titulo} contenido={formularioAdoptate()} textoDelBoton='ADOPTAR' estiloDelBoton={estiloDeBoton} />
  )
}

export default FormularioDeAdoptantes