import { useEffect, useState } from 'react';
import { Table, Tooltip } from 'flowbite-react';
import { Link } from 'react-router-dom';
import dialogs from '../ui/dialogs';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { deleteProductById, getAllProducts } from '../services/products';
import { IProduct } from '../@types/productType';
import { useSearch } from '../hooks/useSearch';

const AdminProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const { searchTerm } = useSearch();

    useEffect(() => {
        getAllProducts()
            .then(res => setProducts(res.data))
            .catch(err => setError(err));
    }, []);

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onDelete = (id: string) => {
        dialogs.confirm("Are you sure?", "Do you want to delete this product?")
            .then((result) => {
                if (result.isConfirmed) {
                    deleteProductById(id)
                        .then(() => {
                            setProducts(products.filter(product => product._id !== id));
                            dialogs.success("Deleted!", "The product has been deleted.");
                        })
                        .catch(err => setError(err));
                }
            })
            .catch(err => setError(err));
    };

    return (
        <div className="overflow-x-auto bg-white dark:border-gray-700 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className='text-4xl text-gray-800 mb-0 text-center mt-0'>Products</h2>
            <div className="flex justify-end mb-4">
                <Tooltip content="Add Product" placement="top" className="text-sm bg-gray-800 text-white rounded px-2 py-1">
                    <Link to="/admin/create-product" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center me-8 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <FiPlus size={20} />
                        <span className="sr-only">Add Product</span>
                    </Link>
                </Tooltip>
            </div>
            {error && <div className="text-red-500 text-center mb-4">{error.message}</div>}
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell className="w-1/6">Title</Table.HeadCell>
                    <Table.HeadCell className="w-1/6">Subtitle</Table.HeadCell>
                    <Table.HeadCell className="w-1/6">Description</Table.HeadCell>
                    <Table.HeadCell className="w-1/3">Variants</Table.HeadCell>
                    <Table.HeadCell className="w-1/10">Total Quantity</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only w-1/8">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredProducts.map((product) => (
                        <Table.Row key={product._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center">
                                <img src={product.image.url} alt={product.alt} className="h-12 w-12 object-cover rounded-full mr-4" />
                            </Table.Cell>
                            <Table.Cell>{product.productName}</Table.Cell>
                            <Table.Cell>{product.subtitle}</Table.Cell>
                            <Table.Cell>{product.productDescription}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((variant, index) => (
                                        <div key={index} className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                            <p className="text-sm">Size: {variant.size}</p>
                                            <p className="text-sm">Price: ${variant.price}</p>
                                            <p className="text-sm">Quantity: {variant.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                {product.variants.reduce((total, variant) => total + variant.quantity, 0)}
                            </Table.Cell>
                            <Table.Cell>
                                <Link to={`/admin/products/${product._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <button onClick={() => onDelete(product._id)} className="text-red-600 hover:text-red-800">
                                    <FiTrash2 size={20} />
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




// import { useEffect, useState } from 'react';
// import { deleteProductById, getAllProducts } from '../services/products'; // ודא שהפונקציה הזו קיימת בשירות המוצרים
// import { Table, Tooltip } from 'flowbite-react';
// import { Link } from 'react-router-dom';
// import dialogs from '../ui/dialogs';
// import { FiPlus, FiTrash2 } from 'react-icons/fi';
// import { IProduct } from '../@types/productType';

// const AdminProducts = () => {
//     const [products, setProducts] = useState<IProduct[]>([]);
//     const [error, setError] = useState<Error | null>(null);

//     useEffect(() => {
//         getAllProducts()
//             .then(res => setProducts(res.data))
//             .catch(err => setError(err));
//     }, []);

//     const onDelete = (id: string) => {
//         dialogs.confirm("Are you sure?", "Do you want to delete this product?")
//             .then((result) => {
//                 if (result.isConfirmed) {
//                     deleteProductById(id)
//                         .then(() => {
//                             setProducts(products.filter(product => product._id !== id));
//                             dialogs.success("Deleted!", "The product has been deleted.");
//                         })
//                         .catch(err => setError(err));
//                 }
//             })
//             .catch(err => setError(err));
//     };

//     return (
//         <div className="overflow-x-auto bg-white dark:border-gray-700 dark:bg-gray-800">
//             <h2 className='mt-9 text-5xl font-extralight text-center mb-3'>Products</h2>
//             <div className="flex justify-end mb-4">
//                 <Tooltip content="Add Product" placement="top" className="text-sm bg-gray-800 text-white rounded px-2 py-1">
//                     <Link to="/admin/create-product" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center me-8 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                         <FiPlus size={20} />
//                         <span className="sr-only">Add Product</span>
//                     </Link>
//                 </Tooltip>
//             </div>
//             <Table hoverable>
//                 <Table.Head>
//                     <Table.HeadCell>Image</Table.HeadCell>
//                     <Table.HeadCell>Title</Table.HeadCell>
//                     <Table.HeadCell>Subtitle</Table.HeadCell>
//                     <Table.HeadCell>Description</Table.HeadCell>
//                     <Table.HeadCell>Price</Table.HeadCell>
//                     <Table.HeadCell>Sizes</Table.HeadCell>
//                     <Table.HeadCell>Quantity</Table.HeadCell>
//                     <Table.HeadCell>
//                         <span className="sr-only">Edit</span>
//                     </Table.HeadCell>
//                 </Table.Head>
//                 <Table.Body className="divide-y">
//                     {products.map((product) => (
//                         <Table.Row key={product._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                             <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center">
//                                 <img src={product.image.url} alt={product.alt} className="h-12 w-12 object-cover rounded-full mr-4" />
//                             </Table.Cell>
//                             <Table.Cell>{product.productName}</Table.Cell>
//                             <Table.Cell>{product.subtitle}</Table.Cell>
//                             <Table.Cell>{product.productDescription}</Table.Cell>
//                             <Table.Cell>{product.price}</Table.Cell>
//                             <Table.Cell className='w-32'>{product.sizes.join(', ')}</Table.Cell>
//                             <Table.Cell>{product.quantity}</Table.Cell>
//                             <Table.Cell>
//                                 <Link to={`/admin/products/${product._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
//                                     Edit
//                                 </Link>
//                             </Table.Cell>
//                             <Table.Cell>
//                                 <button onClick={() => onDelete(product._id)} className="text-red-600 hover:text-red-800">
//                                     <FiTrash2 size={20} />
//                                 </button>

//                             </Table.Cell>
//                         </Table.Row>
//                     ))}
//                 </Table.Body>
//             </Table>
//         </div>
//     );
// }

// export default AdminProducts;
