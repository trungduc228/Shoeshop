import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

// Redux actions
import { listProducts, deleteProduct, createProduct } from '../redux/actions/productActions';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProducListScreen = (props) => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = productDelete;
    const [isSuccess, setIsSuccess] = useState(deleteSuccess);
    const [isError, setIsError] = useState(deleteError);

    const productCreate = useSelector(state => state.productCreate);
    const { loading: createLoading, error: createError, success: createSuccess, product: createdProduct } = productCreate;

    useEffect(() => {

        dispatch({ type: 'PRODUCT_CREATE_RESET' });

        if (!userInfo || !userInfo.isAdmin) {
            props.history.push('/login');
        }

        if (createSuccess) {
            props.history.push(`/products/${createdProduct._id}/edit`);
        }
        else {
            dispatch(listProducts());
        }
    }, [dispatch, deleteSuccess, createSuccess, props.history]);

    useEffect(() => {
        if (deleteError) {
            setIsError(deleteError);
            setTimeout(() => setIsError(null), 10000);
        }
        if (deleteSuccess) {
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
        }
        dispatch({ type: 'PRODUCT_DELETE_RESET' });
    }, [dispatch, deleteError, deleteSuccess]);

    const productDeleteHandler = (id) => {
        if (window.confirm('Are you sure want to delete this item?')) {
            dispatch(deleteProduct(id));
        }
    }
    const createProductHandler = () => {
        // CREATE PRODUCT
        dispatch(createProduct());
    }

    return <>
        <Header />
        <Row className='my-2'>
            <Col className='text-right'>
                <button className='shipping-screen-button' onClick={createProductHandler}> <i className='fas fa-plus' /> Create Product</button>
            </Col>
        </Row>
        {isError && <Message variant='danger' message={deleteError} />}
        {isSuccess && <Message variant='success' message='Product succesfully deleted!' />}
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
                                        <th className="column3">Price</th>
                                        <th className="column4">Category</th>
                                        <th className="column5">Brand</th>
                                        <th className="column6">Edit</th>
                                        <th className="column7">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => {
                                        return <tr key={product._id}>
                                            <td className="column1">{product._id}</td>
                                            <td className="column2">{product.name}</td>
                                            <td className="column3">${product.price}</td>
                                            <td className="column4">{product.category}</td>
                                            <td className="column5">{product.brand}</td>
                                            <td className="column6">
                                                <LinkContainer to={`/products/${product._id}/edit`}>
                                                    <button className='button-details-order'><i className='fas fa-edit' /></button>
                                                </LinkContainer>

                                            </td>
                                            <td className="column7">
                                                <button
                                                    className='button-details-order'
                                                    onClick={productDeleteHandler.bind(null, product._id)}
                                                >
                                                    <i className='fas fa-trash' />
                                                </button>
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

export default ProducListScreen;