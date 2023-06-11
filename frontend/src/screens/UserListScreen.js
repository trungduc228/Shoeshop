import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Header from '../components/Header'
import Footer from '../components/Footer';
// Redux actions
import { getUsers, deleteUser } from '../redux/actions/userActions';

const UserListScreen = (props) => {
    const dispatch = useDispatch();
    const usersList = useSelector(state => state.usersList);
    const { loading, error, users } = usersList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getUsers());
        }
        else {
            props.history.push('/login');
        }
    }, [dispatch]);

    const userDeleteHandler = async (id) => {
        if (window.confirm('Are you sure want to delete this user?')) {
            await dispatch(deleteUser(id));
            dispatch(getUsers());
        }
    }

    return <>
        <Meta title='Users List' />
        <Header />
        {loading ? <LoadingSpinner /> : error ? <Message variant='danger' message={error} /> : (
            <div className='limiter'>
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            <table>
                                <thead>
                                    <tr className="table100-head">
                                        <th className="column1">ID</th>
                                        <th className="column2">Name</th>
                                        <th className="column3">Email</th>
                                        <th className="column4">Admin</th>
                                        <th className="column5">Edit</th>
                                        <th className="column6">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => {
                                        return <tr key={user._id}>
                                            <td className="column1">{user._id}</td>
                                            <td className="column2">{user.name}</td>
                                            <td className="column3"><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                            <td className="column4">
                                                {user.isAdmin ?
                                                    (<i className='fas fa-check' style={{ color: 'green' }} />)
                                                    :
                                                    (<i className='fas fa-times' style={{ color: 'red' }} />)}
                                            </td >
                                            <td className="column5">
                                                <LinkContainer to={`/users/${user._id}/edit`}>
                                                    <button className='button-details-order'><i className='fas fa-edit' /></button>
                                                </LinkContainer>

                                            </td>
                                            <td className="column6">
                                                <button onClick={userDeleteHandler.bind(null, user._id)}
                                                    disabled={user.isAdmin} className='button-details-order'><i className='fas fa-trash' /></button>
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
        <Footer />
    </>
}

export default UserListScreen;