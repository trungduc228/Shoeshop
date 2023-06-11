import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/UI/FormContainer';

// Redux actions
import { savePaymentMethod } from '../redux/actions/cartActions';

const ProductScreen = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress) {
        props.history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    const BackToCart = () => {
        props.history.push('/cart')
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1 className='shipping-screen-title shipping-screen-title-special'>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PAYPAL OR CREDIT CARD'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                </Col>
            </Form.Group>
            <button className='shipping-screen-button shipping-screen-button-special'>Continue</button>
            <button className='shipping-screen-button' onClick={BackToCart}>Back To Cart</button>
        </Form>
    </FormContainer>
}

export default ProductScreen;