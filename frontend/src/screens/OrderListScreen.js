import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Meta from '../components/Meta';

// Redux actions
import { allOrders } from '../redux/actions/orderActions';

const OrderListScreen = (props) => {
    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(allOrders());
        }
        else {
            props.history.push('/login');
        }
    }, [dispatch]);

    return <>
        <Meta title='Order List' />
        <h1>Orders</h1>
        {loading ? <LoadingSpinner /> : error ? <Message variant='danger' message={error} /> : (
            <div className='limiter'>
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
        )}
    </>
}

export default OrderListScreen;