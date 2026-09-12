import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';

import Header from '../../components/Header.jsx';

import './OrdersPage.css';

import { convertMillisecondsToCorrectDate, formatPriceCents } from '../../util/util.js';

export default function OrdersPage({ cartTotalQuantity }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrdersData = async () => {
            const ordersResponse = await axios.get('/api/orders?expand=products');
            setOrders(ordersResponse.data)
        };

        getOrdersData();
    }, []);
    return (
        <>
            <title>Orders</title>

            <Header cartTotalQuantity={cartTotalQuantity} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.length > 0 && (
                        orders.map(order => {
                            return (
                                <div className="order-container" key={order.id}>

                                    <div className="order-header">
                                        <div className="order-header-left-section">
                                            <div className="order-date">
                                                <div className="order-header-label">Order Placed:</div>
                                                <div>{convertMillisecondsToCorrectDate(order.orderTimeMs)}</div>
                                            </div>
                                            <div className="order-total">
                                                <div className="order-header-label">Total:</div>
                                                <div>{formatPriceCents(order.totalCostCents)}</div>
                                            </div>
                                        </div>

                                        <div className="order-header-right-section">
                                            <div className="order-header-label">Order ID:</div>
                                            <div>{order.id}</div>
                                        </div>
                                    </div>

                                    <div className="order-details-grid">
                                        {
                                            order.products.length > 0 && order.products.map(orderProduct => {
                                                return (
                                                    <Fragment key={orderProduct.product.id}>
                                                        <div className="product-image-container">
                                                            <img src={orderProduct.product.image} />
                                                        </div>

                                                        <div className="product-details">
                                                            <div className="product-name">
                                                                {orderProduct.product.name}
                                                            </div>
                                                            <div className="product-delivery-date">
                                                                Arriving on: {convertMillisecondsToCorrectDate(orderProduct.estimatedDeliveryTimeMs)}
                                                            </div>
                                                            <div className="product-quantity">
                                                                Quantity: {orderProduct.quantity}
                                                            </div>
                                                            <button className="buy-again-button button-primary">
                                                                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                                <span className="buy-again-message">Add to Cart</span>
                                                            </button>
                                                        </div>

                                                        <div className="product-actions">
                                                            <a href="/tracking">
                                                                <button className="track-package-button button-secondary">
                                                                    Track package
                                                                </button>
                                                            </a>
                                                        </div>
                                                    </Fragment>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}