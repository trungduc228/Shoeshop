import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Rating from '../components/Rating';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../css/ProductScreen.css'

// Redux actions
import { singleProduct, createReview } from '../redux/actions/productActions';

// Redux constants
import * as productConstants from '../redux/constants/productConstants';

const ProductScreen = (props) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, product, error } = productDetails;

    const productCreateReview = useSelector((state) => state.productCreateReview);
    const { error: createReviewError, success: createReviewSuccess } = productCreateReview;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    console.log(product)

    useEffect(() => {
        if (createReviewSuccess) {
            alert('Review successfully added!');
            setRating(0);
            setComment('');
            dispatch({ type: productConstants.PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(singleProduct(props.match.params.id));
        return () => {
            dispatch({ type: productConstants.PRODUCT_DETAILS_CLEAR });
        }
    }, [dispatch, props.match.params, createReviewSuccess]);


    const addToCartHandler = () => {
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
    }

    const submitReviewHandler = (e) => {
        e.preventDefault();
        dispatch(createReview(props.match.params.id, { rating, comment }));
    }
    return <>
        <Header />
        {loading && <LoadingSpinner />}
        {error ? <Message message={error} /> : (<>
            <div className="card-wrapper-1">
                <div className="card-1">
                    {/* card left */}
                    <img className='product-screen-image' src={product.image} alt={product.name} fluid />
                    {/* card right */}
                    <div className="product-content">
                        <h2 className="product-title">{product.name}</h2>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews}reviews`}
                        />
                        <div className="product-price">
                            <p className="new-price">Price: <span>${product.price}</span></p>
                        </div>
                        <div className="product-detail">
                            <h2>about this item: </h2>
                            <p>{product.description}</p>
                            <ul className='product-detail-ul'>
                                <li className='product-screen-ul'>Brand: <span>{product.brand}</span></li>
                                <li className='product-screen-ul'>Category: <span>{product.category}</span></li>
                                <li className='product-screen-ul'>Stock: <span>{product.countInStock}</span></li>
                                <li className='product-screen-ul'>Shipping Area: <span>All over the world</span></li>
                                <li className='product-screen-ul'>Shipping Fee: <span>Free</span></li>
                            </ul>
                        </div>
                        <div className="purchase-info">
                            {product.countInStock > 0 && (
                                <Form.Control className='product-screen-form' as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((num) => {
                                        return <option key={num + 1} value={num + 1}>{num + 1}</option>
                                    })}
                                </Form.Control>
                            )}
                            <button type="button" className='btn-1'
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}>
                                Add to Cart <i className="fas fa-shopping-cart" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Reviews */}

            {/* If no review exists */}

            {/* If there are reviews */}
            <div className='product-screen-review'>
                <h2 className='product-screen-review-title'>Reviews</h2>
                {product.reviews.length === 0 && <Message variant='info' message='No reviews' />}
                {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                    </ListGroup.Item>
                ))}
                <ListGroup.Item>
                    <h3>Write a review</h3>
                    {createReviewError && <Message variant='danger' message={createReviewError} />}
                    {userInfo ? (
                        <Form onSubmit={submitReviewHandler}>
                            <Form.Group controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    <option value=''>Select rating...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    row='3'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </Form.Group>
                            <button className='product-screen-submit' type='submit' variant='primary'>
                                Submit Review
                            </button>
                        </Form>
                    ) : <Message variant='info' message='Please login to review product' />}
                </ListGroup.Item>
            </div>
        </>
        )}
        <Footer />
    </>
}

export default ProductScreen;