import axios from "axios";
import { ProductData, UpdateProduct } from "../@types/@types";

const baseUrl = "http://localhost:8080/api/v1/products";


export const getProducts = () => axios.get(baseUrl);
export const getProductById = (id: string) => axios.get(baseUrl + `/${id}`);

// export const isFavoriteUrl = (id: string) => {
//     const url = `${baseUrl}/${id}`;
//     return axios.patch(url, {
//         headers: {
//             "x-auth-token": localStorage.getItem("token"),
//         },
//     });
// }

// export const getMyCards = () => {
//     const url = `${baseUrl}/my-cards/`;
//     return axios.get(url, {
//         headers: {
//             "x-auth-token": localStorage.getItem("token"),
//         },
//     });
// }

export const deleteCardById = (id: string) => {
    const url = `${baseUrl}/${id}`;
    return axios.delete(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
}

export const createNewProduct = (data: ProductData) => {
    const url = `${baseUrl}`;
    return axios.post(url, data, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
}
export const getMyProductData = (id: string) => {
    const url = `${baseUrl}/${id}`;
    return axios.get(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
}
export const updateProduct = (id: string, data: UpdateProduct) => {
    const url = `${baseUrl}/${id}`;
    return axios.put(url, data, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
}