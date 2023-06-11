import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import FormContainer from '../components/UI/FormContainer';
import Meta from '../components/Meta';
import '../css/LoginScreen.css'
import imageLogin from '../images/image-login.jpeg'
import '../css/Login.css'

// Redux actions
import { login } from '../redux/actions/userActions';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }


  return (
    <>
      {error && <Message message={error} />}
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">

            <div className="col-sm-7 px-0 d-none d-sm-block">
              <img src={imageLogin} alt="Login image" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
            </div>
            <div className="col-sm-5 text-black login-screen-background">
              <div className='login-screen-padding'>
                <div className="d-flex align-items-center h-custom-2">
                  <form onSubmit={submitHandler} style={{ width: '29rem' }}>
                    <h3 className="fw-normal mb-3 login-screen-button login-screen-title-login">Log in</h3>
                    <div className='login-screen-tiltle-general'>
                      <div className='login-screen-before-title'>*</div>
                      <div className='login-screen-title'>Email</div>
                    </div>
                    <div className="form-outline mb-4  login-screen-input ">
                      <input type='email'

                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='login-screen-tiltle-general'>
                      <div className='login-screen-before-title'>*</div>
                      <div className='login-screen-title'>Password</div>
                    </div>
                    <div className="form-outline mb-4  login-screen-input ">
                      <input type='password'

                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    </div>
                    <div className="pt-1 mb-4">
                      <button className="btn btn-info btn-lg btn-block p-2" type="submit">Login</button>
                    </div>
                    <p> New Customer?{' '}<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}><span className='login-screen-register'>Register</span></Link></p>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginScreen;