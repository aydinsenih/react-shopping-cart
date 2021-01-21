import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

function App() {
    const [products] = useState(data);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem("cart"));
        setCart(localCart);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addItem = (item) => {
        if (cart.filter((mapitem) => mapitem.id === item.id).length === 0) {
            // add only once for each item
            setCart([...cart, item]);
        }
    };
    const delItem = (itemID) => {
        setCart(cart.filter((cartItem) => itemID !== cartItem.id));
    };

    return (
        <div className="App">
            <CartContext.Provider value={cart}>
                <Navigation />
            </CartContext.Provider>

            {/* Routes */}
            <Route exact path="/">
                <ProductContext.Provider value={{ products, addItem }}>
                    <Products />
                </ProductContext.Provider>
            </Route>

            <Route path="/cart">
                <CartContext.Provider value={{ cart, delItem }}>
                    {console.log("app", cart)}
                    <ShoppingCart />
                </CartContext.Provider>
            </Route>
        </div>
    );
}

export default App;
