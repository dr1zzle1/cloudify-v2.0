import { Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { registration } from '../../actions/user'
import './Authorization.scss'

const Signup = () => {
  const dispatch = useDispatch()
  const initialValues = {
    email: '',
    password: '',
  }

  const handleSubmit = (values, { resetForm }) => {
    dispatch(registration(values.email, values.password))
    resetForm()
  }
  return (
    <div className='auth'>
      <div className='auth__wrapper'>
        <h1>Sign up</h1>
        <h2>Sign up to continue</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className='auth__form' id='sign-up'>
            <label htmlFor='email'>Email</label>
            <Field className='auth__fields' required={true} id='email' name='email' />
            <label htmlFor='password'>Password</label>
            <Field type='password' required={true} className='auth__fields' id='password' name='password' />
            <button className='btn' type='submit'>
              Sign up
            </button>
          </Form>
        </Formik>
        <p className='auth__signup-link'>
          Already have an account?
          <Link to='/login'> Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
