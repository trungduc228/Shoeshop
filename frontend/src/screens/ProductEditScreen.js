import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import '../css/AddProduct.css'
// Redux actions
import { singleProduct, updateProduct } from '../redux/actions/productActions';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductEditScreen = (props) => {
    console.log(props.match.params.id);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);

    const productID = props.match.params.id;

    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.productUpdate);
    const [isUpdateError, setIsUpdateError] = useState(errorUpdate);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(successUpdate);

    useEffect(() => {
        if (!product || product._id !== productID) {
            dispatch(singleProduct(productID));
        }
        else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [dispatch, product, productID]);

    useEffect(() => {
        if (successUpdate) {
            setIsUpdateSuccess(true);
            dispatch({ type: 'PRODUCT_UPDATE_RESET' });
            setTimeout(() => setIsUpdateSuccess(false), 5000);
        }
        if (errorUpdate) {
            setIsUpdateError(true);
            dispatch({ type: 'PRODUCT_UPDATE_RESET' });
            setTimeout(() => setIsUpdateError(false), 5000);
        }
    }, [dispatch, successUpdate, errorUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: product._id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }));
    }
    const fileUploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = await axios.post('/api/upload', formData, config);
            setImage(res.data);
            setUploading(false);
        }
        catch (error) {
            console.error(error);
            setUploading(false);
        }
    }

    return <>
        <Header />
        {loading ? <LoadingSpinner /> : error ? <Message variant='danger' message={error} /> : (
            <>
                {/* {isSuccess && <Message variant='success' message='Updated' />} */}
                {isUpdateSuccess && <Message variant='success' message='Updated' />}
                {isUpdateError && <Message variant='danger' message={errorUpdate} />}
                <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
                    <div className="wrapper wrapper--w680">
                        <div className="card card-4">
                            <div className="card-body">
                                <h2 className="title">Product Form</h2>
                                <form onSubmit={submitHandler}>
                                    <div className="row row-space">
                                        <div className="col-6">
                                            <div className="input-group">
                                                <label className="label">Name</label>
                                                <input className="input--style-4" type='text'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="input-group">
                                                <label className="label">Price</label>
                                                <input className="input--style-4" type='number'
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row row-space">
                                        <div className="col-6">
                                            <div className="input-group">
                                                <label className="label">Image</label>
                                                <div className="input-group-icon">
                                                    <Form.Control
                                                        type='file'
                                                        id='image-file'
                                                        label='Upload Product Image'
                                                        custom
                                                        onChange={fileUploadHandler}
                                                    ></Form.Control>
                                                    {uploading && <LoadingSpinner />}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="input-group">
                                                <label className="label">Brands</label>
                                                <input className="input--style-4" type='text'
                                                    value={brand}
                                                    onChange={(e) => setBrand(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row row-space">
                                        <div className="col-6">
                                            <div className="input-group">
                                                <label className="label">Category</label>
                                                <input className="input--style-4" type='text'
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="input-group">
                                                <label className="label">Count In Stock</label>
                                                <input className="input--style-4" type='number'
                                                    value={countInStock}
                                                    onChange={(e) => setCountInStock(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row row-space">
                                        <div className="col-12">
                                            <div className="input-group">
                                                <label className="label">Description</label>
                                                <input className="input--style-4" as='textarea'
                                                    type='text'
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)} />
                                                {loadingUpdate && <LoadingSpinner />}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-t-15">
                                        <button className="btn-addproduct" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}
        <Footer />
    </>
}

export default ProductEditScreen;