import axios from "axios";


export const baseUrl = "https://apinodeproject-2.onrender.com/api/v1/products";

// get all products
export const getAllProducts = () => axios.get(baseUrl);

//get product by id
export const getProductById = (id: string) => axios.get(`${baseUrl}/${id}`);

// create product
export const createNewProduct = (data: FormData) => {
    const url = `${baseUrl}/`;
    return axios.post(url, data, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
        },
    });
};

//delete product
export const deleteProductById = (id: string) => {
    const url = `${baseUrl}/${id}`;
    return axios.delete(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

//update product
export const updateProduct = (id: string, product: FormData) => {
    const url = `${baseUrl}/${id}`;
    return axios.put(url, product, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
        },
    });
};

export const product = {
    getAllProducts,
    getProductById,
    createNewProduct,
    deleteProductById,
    updateProduct,
};

export default product;