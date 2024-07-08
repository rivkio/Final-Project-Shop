import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'flowbite-react';
import { IProduct } from '../@types/@types';
import './products.scss';


const products: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        axios.get<IProduct[]>('http://localhost:8080/api/v1/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="product-list-container">
            {products.map(product => (
                <Card key={product._id} className="product-card">
                    <h5 className="text-xl font-bold">{product.productName}</h5>
                    <img src={product.image.url} alt={product.image.alt} className="w-full h-48 object-cover rounded-t-lg" />
                    <p>{product.productDescription}</p>
                    <p>{product.model}</p>
                    <p className="text-lg font-semibold">${product.price}</p>
                    <p>{product.color}</p>

                    {/* <select name="" id="">
{product.color.map (color => (
    <option key={color} value={color}>{color}</option>
))}
</select> */}

                    <select className="size-select">
                        {product.sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>

                    <button className="buy-now-button">Buy Now</button>
                </Card>
            ))}
        </div>
    );
};

export default products;