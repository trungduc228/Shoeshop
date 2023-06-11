import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';

const CheckoutSteps = (props) => {
    return <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {props.step1 ? (
                <LinkContainer to='/login'>
                    <Nav.Link>SIGN IN</Nav.Link>
                </LinkContainer>
            ) : (<Nav.Link disabled>SIGN IN</Nav.Link>)}
        </Nav.Item>

        <Nav.Item>
            {props.step2 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link>SHIPPING</Nav.Link>
                </LinkContainer>
            ) : (<Nav.Link disabled>SHIPPING</Nav.Link>)}
        </Nav.Item>

        <Nav.Item>
            {props.step3 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link>PAYMENT</Nav.Link>
                </LinkContainer>
            ) : (<Nav.Link disabled>PAYMENT</Nav.Link>)}
        </Nav.Item>

        <Nav.Item>
            {props.step4 ? (
                <LinkContainer to='/login'>
                    <Nav.Link>PLACE ORDER</Nav.Link>
                </LinkContainer>
            ) : (<Nav.Link disabled>PLACE ORDER</Nav.Link>)}
        </Nav.Item>
    </Nav>;
}

export default CheckoutSteps;