import axios from 'axios';

export const loginUser = async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        email: formData.email,
        password: formData.password
    });
    return response;
}

export const getProducts = async() => {
    const token = sessionStorage.getItem('token') || [];
    //const response = await fetch('http://localhost:8080/products')    //SpringBoot
    //const response = await fetch('http://localhost:5000/products')    //Python Local
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`, {headers: { 'Content-Type': 'application/json', 'Authorization': token}})
    const products = await response.json();
    return products;
}

export const deleteProduct = async(id) => {
    const token = sessionStorage.getItem('token') || [];
    const formData = [{'id': id}]
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': token},
        body: JSON.stringify(formData)
    };
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/delete`, requestOptions)
    const product = await response.json();
    return product;
}

export const createProduct = async(formData) => {
    const token = sessionStorage.getItem('token') || [];
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 'Authorization': token
        },
        body: JSON.stringify(formData)
    });
    const product = await response.json();
    return product;
}

export const editProduct = async(formData) => {
    const token = sessionStorage.getItem('token') || [];
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 'Authorization': token
        },
        body: JSON.stringify(formData)
    });
    const product = await response.json();
    return product;
}

export const calculateTotal = (items) => {
    return items.reduce((acumulator, item) => acumulator + item.product.price*item.quantity, 0);
}