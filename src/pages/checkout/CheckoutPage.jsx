import axios from 'axios';
import CheckoutHeader from './CheckoutHeader.jsx';
import OrderSummary from './OrderSummary.jsx';
import PaymentSummary from './PaymentSummary.jsx';
import { useState, useEffect } from 'react';

import './checkout-header.css';
import './CheckoutPage.css';

export default function CheckoutPage({ cartTotalQuantity, cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const getCheckoutData = async () => {
            const deliveryOptionsResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            const paymentSummaryResponse = await axios.get('/api/payment-summary');

            setDeliveryOptions(deliveryOptionsResponse.data);
            setPaymentSummary(paymentSummaryResponse.data);
        };

        getCheckoutData();
    }, []);

    useEffect(() => {
        const getPaymentSummaryData = async () => {
            const paymentSummaryResponse = await axios.get('/api/payment-summary');
            setPaymentSummary(paymentSummaryResponse.data);
        };

        getPaymentSummaryData();
    }, [cart]);

    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader cartTotalQuantity={cartTotalQuantity} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    {deliveryOptions.length > 0 && <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />}
                    {paymentSummary && <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />}
                </div>
            </div>
        </>
    );
}