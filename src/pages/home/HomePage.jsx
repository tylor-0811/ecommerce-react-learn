import { useState, useEffect } from 'react';

import Header from '../../components/Header.jsx';
import ProductsGrid from './ProductsGrid.jsx';
import axios from 'axios';

import './HomePage.css';

function HomePage({ cartTotalQuantity }) {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        //get products from backend
        axios.get('/api/products')
        .then(response => setProducts(response.data));
    }, []);

    return (
        <>
            <title>Ecommerce Project</title>

            <Header cartTotalQuantity={cartTotalQuantity} />
            
            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    );
}

export default HomePage;