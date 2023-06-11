import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import FormContainer from '../components/UI/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

// Redux actions
import { saveShippingAddress } from '../redux/actions/cartActions';
import '../css/Shipping.css'

const ShippingScreen = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

    const submitHandler = (e) => {
        e.preventDefault();
        if (address !== '' && city !== '' && postalCode !== '') {
            dispatch(saveShippingAddress({ address, city, postalCode }));
            props.history.push('/payment');
        }
    }

    const BackToCart = () => {
        props.history.push('/cart')
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1 className='shipping-screen-title'>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter city'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Postal Code'
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <button type='submit' className='shipping-screen-button'>Continue</button>
            <button onClick={BackToCart} className='shipping-screen-button'>Back to Cart</button>
        </Form>
    </FormContainer>
}

export default ShippingScreen;