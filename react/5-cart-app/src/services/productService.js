

export const getProducts = async() => {
    //const response = await fetch('http://localhost:8080/products')    //SpringBoot
    //const response = await fetch('http://localhost:5000/products')    //Python Local
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
    const products = await response.json();
    return products;
}

export const deleteProduct = async(id) => {
    const formData = [{'id': id}]
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    };
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/delete`, requestOptions)
    const product = await response.json();
    return product;
}

export const createProduct = async(formData) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const product = await response.json();
    return product;
}

export const editProduct = async(formData) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const product = await response.json();
    return product;
}

export const calculateTotal = (items) => {
    return items.reduce((acumulator, item) => acumulator + item.product.price*item.quantity, 0);
}