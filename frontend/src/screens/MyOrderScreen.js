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
import '../css/MyOrder.css'

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
    <Meta title='ShoeShop | My Order' />
    {/* Update form */}
    {message && <Message message={message} />}
    {error && <Message message={error} />}
    {loading && <LoadingSpinner />}
    {/* Orders */}
    {loadingOrders ? <LoadingSpinner /> : errorOrders ? <Message variant='danger' message={errorOrders} /> : (
      orders.length === 0 ? <Message variant='info' message='No orders placed' /> : (
        <div className="limiter">
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100">
                <table>
                  <thead>
                    <tr className="table100-head">
                      <th className="column1">ID</th>
                      <th className="column2">Date</th>
                      <th className="column3">Total</th>
                      <th className="column4">Paid</th>
                      <th className="column5">Delivered</th>
                      <th className="column6">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => {
                      return <tr key={order._id}>
                        <td className="column1">{order._id}</td>
                        <td className="column2">{order.createdAt.substring(0, 10)}</td>
                        <td className="column3">${order.totalPrice}</td>
                        <td className="column4">{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                        <td className="column5">{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                        <td className="column6">
                          <LinkContainer to={`/orders/${order._id}`}>
                            <button className='button-details-order'>Details</button>
                          </LinkContainer>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ))}
  </Row>
}

export default ProfileScreen;