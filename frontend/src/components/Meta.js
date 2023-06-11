import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = (props) => {
    return <Helmet>
        <title>{props.title}</title>
        <meta name='description' content={props.description} />
        <meta name='keywords' content={props.keywords} />
    </Helmet>
}

Meta.defaultProps = {
    title: 'ShoeShop',
    description: 'ShoeShop - The best e-commerce website',
    keywords: 'shoe'
};

export default Meta;