import { useNavigate } from "react-router-dom";
export const ProductCardView = ({ handler, id, name, description, price, image }) => {
    const navigate = useNavigate();
    const onAddProduct = (product)=>{
        handler(product);
        navigate('/cart');
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    {/* <img src="/img/p2.png" className="card-img-top"/> */}
                    <img src={image} className="card-img-top" width="300" height="213"/>
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">{price}</p>
                    <button className="btn btn-primary"
                    onClick={() => onAddProduct({id, name, description, price})}>Add</button>
                </div>
            </div>
        </>
    );
}