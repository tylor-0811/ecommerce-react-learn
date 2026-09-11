import Product from './Product.jsx';

function ProductsGrid({ products, loadCart }) {
    return (
        <div className="products-grid">
            {products.map(product => <Product key={product.id} product={product} loadCart={loadCart} />)}
        </div>
    );
}

export default ProductsGrid;