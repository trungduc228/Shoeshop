import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import registerImage from '../images/register-image.jpeg'
// Components
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import FormContainer from '../components/UI/FormContainer';
import Meta from '../components/Meta';
import '../css/Login.css'

// Redux actions
import { register } from '../redux/actions/userActions';

const RegisterScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    }
    else {
      dispatch(register(name, email, password));
    }
  }


  return (
    <>
      {message && <Message message={message} />}
      {error && <Message message={error} />}
      {loading && <LoadingSpinner />}<section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-5 text-black login-screen-background">
              <div className='register-screen-padding'>
                <div className="d-flex align-items-center h-custom-2">
                  <form onSubmit={submitHandler} style={{ width: '25rem' }}>
                    {/* Name*/}
                    <h3 className="fw-normal mb-3 login-screen-button login-screen-title-login">Register</h3>
                    <div className='login-screen-tiltle-general'>
                      <div className='login-screen-before-title'>*</div>
                      <div className='login-screen-title'>Name</div>
                    </div>
                    <div className="form-outline mb-4  login-screen-input ">
                      <input type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                    {/*Email*/}
                    <div className='login-screen-tiltle-general'>
                      <div className='login-screen-before-title'>*</div>
                      <div className='login-screen-title'>Email</div>
                    </div>
                    <div className="form-outline mb-4  login-screen-input ">
                      <input type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {/*Password*/}
                    <div className='login-screen-tiltle-general'>
                      <div className='login-screen-before-title'>*</div>
                      <div className='login-screen-title'>Password</div>
                    </div>
                    <div className="form-outline mb-4  login-screen-input ">
                      <input type='password'

                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    </div>
                    {/*Confirm Password*/}
                    <div className='login-screen-tiltle-general'>
                      <div className='login-screen-before-title'>*</div>
                      <div className='login-screen-title'> Confirm Password</div>
                    </div>
                    <div className="form-outline mb-4  login-screen-input ">
                      <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {/*End Confirm Password*/}
                    <div className="pt-1 mb-4">
                      <button className="btn btn-info btn-lg btn-block p-2" type="submit">Register</button>
                    </div>
                    <p> Already have account?{' '}<Link to='/login'><span className='login-screen-register'>Login</span></Link></p>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-sm-7 px-0 d-none d-sm-block">
              <img src={registerImage} alt="Login image" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default RegisterScreen;