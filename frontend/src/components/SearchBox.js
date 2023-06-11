import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search?keyword=${keyword}`);
        }
    }

    return <Form onSubmit={submitHandler} className='d-flex my-2'>

        <form class="form-horizontal" name="j2storeserachForm" id="j2storeserachForm_100">
            <input type="text" class="inputbox inputbox-border"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search products...'
                id="mod_j2store_search-100" />
        </form>
        <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
    </Form>
}

export default SearchBox;
