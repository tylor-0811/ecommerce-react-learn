import axios from 'axios';
import CheckoutHeader from './CheckoutHeader.jsx';
import OrderSummary from './OrderSummary.jsx';
import PaymentSummary from './PaymentSummary.jsx';
import { useState, useEffect } from 'react';

import './checkout-header.css';
import './CheckoutPage.css';

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

            <CheckoutHeader cartTotalQuantity={cartTotalQuantity} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
                    {paymentSummary && <PaymentSummary paymentSummary={paymentSummary} cartTotalQuantity={cartTotalQuantity}  />}
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;