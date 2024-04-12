import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { deleteProduct } from "../services/productService";
import { createProduct } from "../services/productService";
import { editProduct } from "../services/productService";
import Swal from "sweetalert2";

const initialData = {
    id: 0,
    name: '',
    description: '',
    price: '',
    image: ''
};

export const ProductsView = () => {
    const [userSelected, setUserSelected] = useState(initialData);
    const [formData, setFormData] = useState(initialData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [products, setProducts] = useState([]);
    const findAll = async () => {
        const prods = await getProducts();
        setProducts(prods);
    }
    useEffect(
        () => {
            findAll();
        }, []);

    useEffect(() => {
        setFormData({
            ...userSelected
        });
    }, [userSelected]);

    const handleDeleteConfirmation = async (id) => {
        const response = await deleteProduct(id);
        if (response.status == 'ok') {
            setProducts(prevData => prevData.filter(prod => prod.id !== id));
        }
        return response.status;
    }
    const handleDelete = async (id) => {
        /*if (confirm('Are you sure you want to delete this product?')) {
            const response = await deleteProduct(id);
            if (response.status == 'ok') {
                setProducts(prevData => prevData.filter(prod => prod.id !== id));
            }
        } else {
            return;
        }*/
        Swal.fire({
            title: "Are you sure you want to delete this product?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirmation(id);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

            }
        });

    }

    const handleEdit = (id, name, description, price, image) => {
        //console.log(id, name, description, price, image)
        setUserSelected({
            id: id,
            name: name,
            description: description,
            price: price,
            image: image
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (formData.name == '' || formData.description == '' || formData.price == '' || formData.image == '') {
            //alert('Some data is missing in the form!');
            Swal.fire(
                'Validacion Error',
                'Some data is missing in the form!',
                'error'
            );
            return;
        }
        if (formData.id > 0) {
            handleEditProduct();
        } else {
            handleCreateProduct();
        }
    }
    const handleCreateProduct = async () => {
        const response = await createProduct(formData);
        if (response.status == 'ok') {
            findAll();
            setFormData(initialData);
        }
    }
    const handleEditProduct = async () => {
        const response = await editProduct(formData);
        if (response.status == 'ok') {
            findAll();
            setFormData(initialData);
        }
    }

    return (<>

        <div className="container my-4">
            <div className="row">
                <div className="col">
                    <form onSubmit={onSubmit}>
                        <input
                            className="form-control my-3 w-75"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            className="form-control my-3 w-75"
                            placeholder="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <input
                            className="form-control my-3 w-75"
                            placeholder="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <input
                            className="form-control my-3 w-75"
                            placeholder="Image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />
                        <input type="hidden"
                            name="id"
                            value={formData.id} />
                        <button
                            className="btn btn-primary"
                            type="submit">
                            {formData.id > 0 ? 'Edit' : 'Create'}
                        </button>
                    </form>
                </div>
                <div className="col">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(prod =>
                            (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.description}</td>
                                    <td>{prod.price}</td>
                                    <td><img src={prod.image} width="70" height="50" /></td>
                                    <td><button className="btn btn-danger" onClick={() => handleDelete(prod.id)}>Delete</button></td>
                                    <td><button className="btn btn-secondary" onClick={() => handleEdit(prod.id, prod.name, prod.description, prod.price, prod.image)}>Edit</button></td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </>)
}