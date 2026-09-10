import axios from 'axios';
import { useState, useEffect } from 'react';
import { convertMillisecondsToCorrectDate } from '../util/util.js';

import './checkout-header.css';
import './CheckoutPage.css';

import { formatPriceCents } from '../util/util.js';

function CheckoutPage({ cartTotalQuantity, cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then(response => setDeliveryOptions(response.data));

        axios.get('/api/payment-summary')
            .then(response => setPaymentSummary(response.data));
    }, []);

    return (
        <>
            <title>Checkout</title>

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">{cartTotalQuantity} items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {
                            cart.map(cartItem => {
                                const { quantity } = cartItem;
                                const { id, name, image, priceCents } = cartItem.product;

                                const selectedDeliveryOption =
                                    deliveryOptions.find(deliveryOption => deliveryOption.id === cartItem.deliveryOptionId);

                                return (
                                    <div className="cart-item-container" key={id}>
                                        <div className="delivery-date">
                                            Delivery date: {
                                                convertMillisecondsToCorrectDate(selectedDeliveryOption.estimatedDeliveryTimeMs)
                                            }
                                        </div>

                                        <div className="cart-item-details-grid">
                                            <img className="product-image"
                                                src={image} />

                                            <div className="cart-item-details">
                                                <div className="product-name">
                                                    {name}
                                                </div>
                                                <div className="product-price">
                                                    {formatPriceCents(priceCents)}
                                                </div>
                                                <div className="product-quantity">
                                                    <span>
                                                        Quantity: <span className="quantity-label">{quantity}</span>
                                                    </span>
                                                    <span className="update-quantity-link link-primary">
                                                        Update
                                                    </span>
                                                    <span className="delete-quantity-link link-primary">
                                                        Delete
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="delivery-options">
                                                <div className="delivery-options-title">
                                                    Choose a delivery option:
                                                </div>
                                                {
                                                    deliveryOptions.length > 0 && deliveryOptions.map(deliveryOption => {
                                                        let priceString = 'FREE Shipping';
                                                        const { estimatedDeliveryTimeMs } = deliveryOption;

                                                        {
                                                            (priceCents > 0) &&
                                                                (priceString = `${formatPriceCents(deliveryOption.priceCents)} - Shipping`)

                                                        }

                                                        return (
                                                            <div className="delivery-option" key={deliveryOption.id}>
                                                                <input type="radio"
                                                                    checked={deliveryOption.id === cartItem.deliveryOptionId}
                                                                    className="delivery-option-input"
                                                                    name={`delivery-option-${cartItem.product.id}`} />
                                                                <div>
                                                                    <div className="delivery-option-date">
                                                                        {
                                                                            convertMillisecondsToCorrectDate(estimatedDeliveryTimeMs)
                                                                        }
                                                                    </div>
                                                                    <div className="delivery-option-price">
                                                                        {priceString}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>

                    {paymentSummary && (
                        <>
                            <div className="payment-summary">
                                <div className="payment-summary-title">
                                    Payment Summary
                                </div>

                                <div className="payment-summary-row">
                                    <div>Items ({cartTotalQuantity}):</div>
                                    <div className="payment-summary-money">{formatPriceCents(paymentSummary.productCostCents)}</div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div className="payment-summary-money">{formatPriceCents(paymentSummary.shippingCostCents)}</div>
                                </div>

                                <div className="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div className="payment-summary-money">{formatPriceCents(paymentSummary.totalCostBeforeTaxCents)}</div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">{formatPriceCents(paymentSummary.taxCents)}</div>
                                </div>

                                <div className="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div className="payment-summary-money">{formatPriceCents(paymentSummary.totalCostCents)}</div>
                                </div>

                                <button className="place-order-button button-primary">
                                    Place your order
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;