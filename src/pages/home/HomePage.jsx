import { useState, useEffect } from 'react';

import Header from '../../components/Header.jsx';
import ProductsGrid from './ProductsGrid.jsx';
import axios from 'axios';

import './HomePage.css';

function HomePage({ cartTotalQuantity }) {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const getProductsData = async () => {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        };

        //get products data from backend
        getProductsData();
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