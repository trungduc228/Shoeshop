import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/Product.css'
// Component
import Rating from './Rating';

const Product = (props) => {
    return <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${props.product._id}`}>
            <Card.Img src={props.product.image} variant='top' />
        </Link>

        <Card.Body>
            <Link to={`/product/${props.product._id}`}>
                <Card.Title as='div'>
                    <strong className='product-name'>{props.product.name}</strong>
                </Card.Title>
            </Link>

           <div className='product-review'>
           <Rating value={props.product.rating} />
                <h5>{`${props.product.numReviews} reviews`}</h5>
           </div>
                
           
            <Card.Text as='h3'>${props.product.price}</Card.Text>
        </Card.Body>
    </Card>
}

export default Product;