// ProductList.tsx
import { useState, useEffect, FC } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import './products.scss'
import { useSearch } from '../hooks/useSearch';
import { getAllProducts } from '../services/products';
import { IProduct } from '../@types/productType';

const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { searchTerm } = useSearch();

    useEffect(() => {
        getAllProducts()
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="product-list-container">
            {filteredProducts.map(product => (
                <Card key={product._id} className="product-card">
                    <Link to={`/products/${product._id}`}>
                        <img src={product.image.url} alt={product.image.alt} className="w-full h-48 object-cover rounded-t-lg" />
                        <h5 className="text-xl font-bold">{product.productName}</h5>
                        <h6 className="text-md font-semibold">{product.subtitle}</h6>
                        <p>{product.productDescription}</p>
                        <p className="text-lg font-semibold">${product.price}</p>
                    </Link>
                    {/* <p>Size: {product.sizes}</p> */}
                    <label className='font-bold'>Choose Size:</label>
                    <select className="size-select">
                        {product.sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    <p>Quantity: {product.quantity}</p>
                    <p>Barcode: {product.barcode}</p>
                    <button className="buy-now-button">Buy Now</button>

                </Card>
            ))}
        </div>
    );
};

export default Products;