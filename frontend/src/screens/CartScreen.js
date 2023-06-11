import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, ListGroup, Image, Form } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import Meta from '../components/Meta';
import '../css/CartScreen.css'
// Redux actions
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import Header from '../components/Header'
import Footer from '../components/Footer';

const CartScreen = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
        props.history.push(`/login?redirect=shipping`);
    }
    console.log(cartItems)
    return (
        <>
            <Header />
            {cartItems.length === 0 ? (
                <Message variant='info' message='Your cart is empty' />
            ) : (
                <section class="h-100 gradient-custom">
                    <div class="container py-5">
                        <div class="row d-flex justify-content-center my-4">
                            <div class="col-md-8">
                                <div class="card mb-4">
                                    <div class="card-header py-3">
                                        <h5 class="mb-0">Cart</h5>
                                    </div>

                                    {cartItems.map((item) => (
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                    <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                        <img className='imgCart' src={item.image} alt={item.name} />
                                                    </div>
                                                </div>
                                                <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">

                                                    <p className='cart-screen-title-product-bold'><Link to={`/product/${item.product}`}>Name: {item.name}</Link></p>
                                                    <p className='cart-screen-title-product'>Count In Stock:{item.countInStock}</p>
                                                    <p className='cart-screen-title-product'>Price:{item.price}</p>
                                                    <button type="button"
                                                        variant='light'
                                                        onClick={() => removeFromCartHandler(item.product)} class="cart-screen-button-delete btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                                                        title="Remove item">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                    <Form.Control
                                                        className='cart-screen-formControl'
                                                        as='select'
                                                        value={item.qty}
                                                        onChange={(e) =>
                                                            dispatch(addToCart(item.product, Number(e.target.value)))}
                                                    >
                                                        {[...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card mb-4">
                                    <div class="card-header py-3">
                                        <h5 class="mb-0">Summary</h5>
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group list-group-flush">
                                            <li
                                                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Products
                                                <span>$53.98</span>
                                            </li>
                                            <li
                                                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">

                                                <span> Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                                    items</span>
                                            </li>
                                            <li
                                                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Total amount:  {cartItems
                                                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                                                        .toFixed(2)}</strong>

                                                </div>

                                            </li>
                                        </ul>

                                        <button type='button'
                                            className='btn-block'
                                            disabled={cartItems.length === 0}
                                            onClick={checkoutHandler} class="btn btn-primary btn-lg btn-block">
                                            Go to checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <Footer />
        </>

    )
}

export default CartScreen;
