import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

// Redux actions
import { createOrder } from '../redux/actions/orderActions';
import '../css/PlaceOrder.css'

const PlaceOrderScreen = (props) => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    // Calculations
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => {
        return acc + (item.price * item.qty)
    }, 0)
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 15;
    cart.taxPrice = parseFloat((0.18 * cart.itemsPrice).toFixed(2));
    cart.totalPrice = parseFloat((cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2));

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }));
    }


    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;
    useEffect(() => {
        if (success) {
            props.history.push(`/orders/${order._id}`);
        }
    }, [success, props.history]);

    return <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2 className='place-order-title-shipping'>Shipping Information</h2>
                        <div>
                            <p className='place-order'><strong>Address:</strong>{`${cart.shippingAddress.address}`} </p>
                            <p className='place-order'><strong>City:</strong>{`${cart.shippingAddress.city}`} </p>
                            <p className='place-order'><strong>postalCode:</strong>{`${cart.shippingAddress.postalCode}`} </p>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method: {cart.paymentMethod}</h2>

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (<Message variant='info' message='Your cart is empty' />) : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => {
                                    return <ListGroup.Item key={index}>
                                        <Row className='place-order-name'>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link className='place-order-product-name' to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col >
                                                ${item.price} x {item.qty} = ${item.price * item.qty}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                })}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {/* Displaying if any error happens */}
                        {error && <Message variant='danger' message={error} />}
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}
                                disable={cart.cartItems.length === 0}
                            >
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>

}

export default PlaceOrderScreen;