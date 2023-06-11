import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

// Redux actions
import { getUserDetails, updateUser } from '../redux/actions/userActions';
import imageShoe from '../images/shoeImageUpdate.png'
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserEditScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector(state => state.userDetails);

    const { loading: updateLoading, error: updateError, success: updateSuccess } = useSelector(state => state.userUpdate);
    const [isSuccess, setIsSuccess] = useState(updateSuccess);

    const userID = props.match.params.id;

    useEffect(() => {
        if (updateSuccess) {
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
            dispatch({ type: 'USER_UPDATE_RESET' });
        }
        else {
            if (!user || user._id !== userID) {
                dispatch(getUserDetails(userID));
            }
            else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }

    }, [dispatch, user, getUserDetails, updateSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userID, name, email, isAdmin }));
    }
    return <>
        <Header />
        {loading ? <LoadingSpinner /> : error ? <Message variant='danger' message={error} /> : (
            <>
                {isSuccess && <Message variant='success' message='Updated' />}
                <div className="page-content">
                    <div className="form-v7-content">
                        <div className="form-left">
                            <img src={imageShoe} alt="form" />
                        </div>
                        <form onSubmit={submitHandler} className="form-detail" action="#" method="post" id="myform">
                            <h3 style={{ marginBottom: "30px" }}>Update Information</h3>
                            <div className="form-row">
                                <label htmlFor="username">Name</label>
                                <input type='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="your_email">E-MAIL</label>
                                <input type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-row-last">
                                <button className='form-row-button-update' type='submit' >Update</button>
                            </div>

                        </form>
                    </div>
                </div>

            </>
        )}
        <Footer />
    </>
}

export default UserEditScreen;