import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Col, Container, Row } from 'react-grid-system'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const FormularioDeAdopcion = () => {
  const { mascota } = useContext(AppContext)
  const navigate = useNavigate()
  const [valorSeleccionado, setValorSeleccionado] = useState()
  const { register, handleSubmit } = useForm()

  const onSubmit = async datos => {
    try {
      const preguntas = [
        { question: '¿Cuántas personas habitan en el hogar? ¿Cuáles son sus edades? ¿Cual es su parentesco / vínculo?', answer: datos.questions1 },
        { question: '¿Hay niños en la casa? ¿De qué edad?', answer: datos.questions2 },
        { question: '¿Hay otros animales en la casa?', answer: datos.questions3 },
        { question: '¿Ha pensado qué hará con el animal en vacaciones?', answer: datos.questions4 },
        { question: '¿Cuántas horas estima que el animal estará solo en la propiedad? ¿Cuántas veces lo sacará a pasear por día?', answer: datos.questions5 }
      ]

      datos = {
        name: datos.name,
        lastname: datos.lastname,
        dni: datos.dni,
        phone: datos.phone,
        address: datos.address,
        email: datos.email,
        date: datos.date,
        questions: preguntas,
        pet: mascota._id
      }

      await axios.post('http://localhost:3001/api/solicitudes-de-adopcion', datos)
      navigate('/inicio')
    } catch (error) {
      console.error('Error al enviar los datos:', error)
    }
  }
  const date = new Date().toLocaleString()

  const handleChange = (event) => {
    setValorSeleccionado(event.target.value)
  }

  useEffect(() => {
    if (!mascota.name) {
      navigate('/mascotas-en-adopcion')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container id='formulario-adopcion' style={{ maxWidth: '1000px' }}>
      <h1>¡Es hoy, es hoy!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Completá el siguente formulario de adopción para {mascota.name}.</h3>
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
            <input type='tel' placeholder='Teléfono' {...register('phone', { required: true, maxLength: 100 })} />
          </Col>
          <Col sm={12}>
            <input type='email' placeholder='Mail' {...register('email', { required: true, maxLength: 100 })} />
          </Col>
          <Col>
            <input type='text' placeholder='Direccion' {...register('address', { required: true })} />
          </Col>
          <input type='hidden' value={date} {...register('date', { required: true })} />
          <input type='hidden' value={mascota} {...register('pet', { required: true })} />
          <Col sm={12}>
            <label> ¿Cuántas personas habitan en el hogar? ¿Cuáles son sus edades? ¿ Cual es su parentesco / vinculo?
              <textarea type='text' {...register('questions1', { required: true })} />
            </label>
            <label> ¿Hay niños en la casa? ¿De qué edad?
              <textarea type='text' {...register('questions2', { required: true })} />
            </label>
            <label> ¿Hay otros animales en la casa?
              <select name='select' value={valorSeleccionado} onChange={handleChange}>
                <option value='Si'>Si</option>
                <option value='No'>No</option>
              </select>
              {valorSeleccionado === 'Si' && (
                <label> ¿Están vacunados y/o castrados? ¿Cuáles son sus edades?
                  <textarea type='text' {...register('questions', {})} />
                </label>
              )}
              {valorSeleccionado === 'No'}{
                <label> En caso que no los haya, ¿ha tenido? ¿Qué pasó con ellos?
                  <textarea type='text' {...register('questions3', { required: true })} />
                </label>
              }
            </label>
            <label> ¿Ha pensado qué hará con el animal en vacaciones?
              <textarea type='text' {...register('questions4', { required: true })} />
            </label>
            <label> ¿Cuántas horas estima que el animal estará solo en la propiedad? ¿Cuántas veces lo sacará a pasear por día?
              <textarea type='text' {...register('questions5', { required: true })} />
            </label>
          </Col>
          <Col sm={12}>
            <button className='boton-submit'>Enviar</button>
          </Col>
        </Row>
      </form>
    </Container>
  )
}

export default FormularioDeAdopcion