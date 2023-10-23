import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import OrderForm from "./components/OrderForm/OrderForm";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [formIsShown, setFormIsShown] = useState(false);
  const [ordered, setIsOrdered] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showFormHanlder = () => {
    setFormIsShown(true);
    setCartIsShown(false);
  };

  const returnHandler = () => {
    setFormIsShown(false);
    setCartIsShown(true);
  };

  const resetWindows = () => {
    setFormIsShown(false);
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      {formIsShown && <OrderForm onReturn={returnHandler} onReset={resetWindows}/>}
      {cartIsShown && (
        <Cart onClose={hideCartHandler} onShow={showFormHanlder} />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
