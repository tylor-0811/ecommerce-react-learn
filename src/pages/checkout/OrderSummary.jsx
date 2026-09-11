import { convertMillisecondsToCorrectDate, formatPriceCents } from '../../util/util.js';
import DeliveryOptions from './DeliveryOptions.jsx';

function OrderSummary({ cart, deliveryOptions }) {
    return (
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
                                Delivery date: {convertMillisecondsToCorrectDate(selectedDeliveryOption.estimatedDeliveryTimeMs)}
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

                                <DeliveryOptions deliveryOptions={deliveryOptions} priceCents={priceCents} cartItem={cartItem} />
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default OrderSummary;