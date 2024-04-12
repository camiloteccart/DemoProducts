import { useItemsCart } from "./hooks/useItemsCart";
import { Navbar } from "./components/Navbar";
import { CartRoutes } from "./routes/CartRoutes";
import { Footer } from "./components/Footer";

export const CartApp = () => {
    const { cartItems, handlerAddProductCart, handlerDeleteProductCart } = useItemsCart();
    return (
        <>
            <Navbar />
            <div className="container my-4">
                <h3>Online Store App</h3>
                {/* <Carousel /> */}
                <CartRoutes
                    cartItems={cartItems}
                    handlerAddProductCart={handlerAddProductCart}
                    handlerDeleteProductCart={handlerDeleteProductCart}
                />
            </div>
            <Footer/>
        </>
    )
}