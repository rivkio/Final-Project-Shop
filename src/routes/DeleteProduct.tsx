import { useEffect, useState } from 'react';
import { deleteProductById, getAllProducts } from '../services/products'; // ודא שהפונקציה הזו קיימת בשירות המוצרים
import { IProduct } from '../@types/productType';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';



const AdminProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getAllProducts()
            .then(res => setProducts(res.data))
            .catch(err => setError(err));
    }, []);

    const onDelete = (id: string) => {
        deleteProductById(id)   
            .then(() => {
                setProducts(products.filter(product => product._id !== id));
            })
            .catch(err => setError(err));
    }

    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>ProductName</Table.HeadCell>
                    <Table.HeadCell>Subtitle</Table.HeadCell>
                    <Table.HeadCell>ProductDescription</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Size</Table.HeadCell>
                    <Table.HeadCell>Quantity</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {products.map((product) => (
                        <Table.Row key={product._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {product.productName}
                            </Table.Cell>
                            <Table.Cell>{product.subtitle}</Table.Cell>
                            <Table.Cell>{product.productDescription}</Table.Cell>
                            <Table.Cell>{product.price}</Table.Cell>
                            <Table.Cell>{product.sizes}</Table.Cell>
                            <Table.Cell>{product.quantity}</Table.Cell>
                            <Table.Cell>
                                <Link to={`/admin/products/${product._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <button onClick={() => onDelete(product._id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    delete
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default AdminProducts;