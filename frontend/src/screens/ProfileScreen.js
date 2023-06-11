import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Components
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import Meta from '../components/Meta';

// Redux actions
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions';
import { myOrders } from '../redux/actions/orderActions';
import '../css/Profile.css'
import imageShoe from '../images/shoeImageUpdate.png'
import Header from '../components/Header'
import Footer from '../components/Footer';

const ProfileScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMy = useSelector(state => state.orderMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMy;

  useEffect(() => {
    // If user is not logged in
    if (!userInfo) {
      props.history.push('/login');
    }
    else {
      if (!user) {
        dispatch(getUserDetails('profile'));
        dispatch(myOrders());
      }
      else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, props.history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    }
    else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  }


  return <Row>

    <Meta title='ShoeShop | My Profile' />
    {/* Update form */}
    <Header />
    {message && <Message message={message} />}
    {error && <Message message={error} />}
    {success && <Message variant='success' message={'Profile successfully updated'} />}
    {loading && <LoadingSpinner />}
    <div className="page-content">
      <div className="form-v7-content">
        <div className="form-left">
          <img src={imageShoe} alt="form" />
        </div>
        <form onSubmit={submitHandler} className="form-detail" action="#" method="post" id="myform">
          <h3>Update Information</h3>
          <div className="form-row">
            <label htmlFor="username">Name</label>
            <input type='text' onChange={(e) => setName(e.target.value)} name="username" id="username" />
          </div>
          <div className="form-row">
            <label htmlFor="your_email">E-MAIL</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-row ">
            <label htmlFor="password">PASSWORD</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-row">
            <label htmlFor="comfirm_password">CONFIRM PASSWORD</label>
            <input type='password' onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className="form-row-last">
            <button className='form-row-button-update' type='submit' >Update</button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </Row>
}

export default ProfileScreen;