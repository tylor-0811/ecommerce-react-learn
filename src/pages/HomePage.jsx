import { useState, useEffect } from 'react';

import Header from '../components/Header.jsx';
import axios from 'axios';

import { formatPriceCents } from '../util/util.js';

import './HomePage.css';

function HomePage() {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
        .then(response => {
            console.log(response.data);
            setProducts(response.data);
        });
    }, []);

    return (
        <>
            <title>Ecommerce Project</title>

            <Header />
            <div className="home-page">
                <div className="products-grid">
                    {products.map(product => {
                        const { id, image, name, rating, priceCents } = product;
                        const { stars, count } = rating;
                        return (
                            <div key={id} className="product-container">
                                <div className="product-image-container">
                                    <img className="product-image"
                                        src={image} />
                                </div>

                                <div className="product-name limit-text-to-2-lines">
                                    {name}
                                </div>

                                <div className="product-rating-container">
                                    <img className="product-rating-stars"
                                        src={`images/ratings/rating-${stars * 10}.png`} />
                                    <div className="product-rating-count link-primary">
                                        {count}
                                    </div>
                                </div>

                                <div className="product-price">
                                    ${formatPriceCents(priceCents)}
                                </div>

                                <div className="product-quantity-container">
                                    <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>

                                <div className="product-spacer"></div>

                                <div className="added-to-cart">
                                    <img src="images/icons/checkmark.png" />
                                    Added
                                </div>

                                <button className="add-to-cart-button button-primary">
                                    Add to Cart
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
export default HomePage;