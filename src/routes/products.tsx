// ProductList.tsx
import { useState, useEffect, FC } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import './products.scss'
import { useSearch } from '../hooks/useSearch';
import { getAllProducts } from '../services/products';
import { IProduct } from '../@types/productType';
import AddToCartButton from '../components/AddToCartButton/AddToCartButton';


const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { searchTerm } = useSearch();
    const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response.data);
                const initialSizes = response.data.reduce((acc: { [key: string]: string }, product: IProduct) => {
                    acc[product._id] = product.variants[0].size;
                    return acc;
                }, {});
                setSelectedSizes(initialSizes);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        [product.productName, product.subtitle, product.productDescription].some(field =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;



    return (
        <div className="product-list-wrapper">
            <h1 className='main-title'>Our Products</h1>

            <div className="product-list-container">

                {filteredProducts.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    filteredProducts.map(product => (
                        <Card key={product._id} className="product-card">
                            <Link to={`/products/${product._id}`} className="product-link">
                                <img src={product.image.url} alt={product.alt} className="w-full max-h-85 object-cover rounded-t-lg" />
                                <div className="product-info">
                                    <h5 className="text-xl font-bold">{product.productName}</h5>
                                    <h6 className="text-md mb-3 font-semibold">{product.subtitle}</h6>
                                    <p>{product.productDescription}</p>
                                </div>
                            </Link>

                            <AddToCartButton
                                productId={product._id}
                                variants={product.variants}
                                productName={product.productName}
                                image={product.image}
                                disabled={product.quantity === 0}
                            />
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Products;




// const handleAddToCart = async (productId: string) => {
//     const size = selectedSizes[productId];
//     if (!size) {
//         alert('Please select a size.');
//         return;
//     }
//     try {
//         await cartService.addProductToCart(productId, 1, size);
//         alert('Product added to cart!');
//     } catch (error) {
//         console.error('Failed to add product to cart.', error);
//     }
// };

//     return (
//         <div className="product-list-container">
//             {filteredProducts.map(product => (
//                 <Card key={product._id} className="product-card">
//                     <Link to={`/products/${product._id}`}>
//                         <div className="product-content">
//                             <img src={product.image.url} alt={product.alt} className="w-full h-48 object-cover rounded-t-lg" />
//                             <h5 className="text-xl font-bold">{product.productName}</h5>
//                             <h6 className="text-md font-semibold">{product.subtitle}</h6>
//                             <p>{product.productDescription}</p>
//                             <div className="price-container">
//                                 <span className="original-price" style={{ marginRight: '10px' }}>
//                                     ${(product.price * 1.2).toFixed(2)}
//                                 </span>
//                                 <span className="discounted-price">
//                                     ${product.price.toFixed(2)}
//                                 </span>
//                             </div>

//                             <div className="size-buttons-container">
//                                 {product.sizes.map((size) => (
//                                     <button
//                                         key={size}
//                                         className={`size-button ${selectedSizes[product._id] === size ? 'selected' : ''}`}
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             handleSizeSelect(product._id, size);
//                                         }}
//                                         disabled={product.quantity === 0} // Disable the button if out of stock
//                                     >
//                                         {size}
//                                     </button>
//                                 ))}
//                             </div>
//                             <p className={product.quantity > 0 ? '' : 'out-of-stock'}>{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
//                         </div>
//                     </Link>
//                     <AddToCartButton
//                         productId={product._id}
//                         productName={product.productName}
//                         price={product.price}
//                         image={product.image.url || ""}
//                         size={selectedSizes[product._id] || product.sizes[0]} // Default to first size if none selected
//                         onAdd={() => console.log("Product added to cart")}
//                         disabled={product.quantity === 0}
//                     />
//                 </Card>
//             ))}
//         </div>
//     );
// };

// export default Products;

