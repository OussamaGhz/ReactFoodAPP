import Modal from "../UI/Modal";
import useInput from "../../hooks/use-input";
import classes from "./OrderForm.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";

const OrderForm = (props) => {
  const {
    value: name,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    reset: nameReset,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: street,
    valueIsValid: streetIsValid,
    hasError: streetHasError,
    reset: streetReset,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: City,
    valueIsValid: CityIsValid,
    hasError: CityHasError,
    reset: CityReset,
    valueChangeHandler: CityChangeHandler,
    valueBlurHandler: CityBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: postalCode,
    valueIsValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    reset: postalCodeReset,
    valueChangeHandler: postalCodeChangeHandler,
    valueBlurHandler: postalCodeBlurHandler,
  } = useInput((value) => value.trim().length === 5);

  let formValid = true;

  if (!CityIsValid || !streetIsValid || !nameIsValid) {
    formValid = false;
  }
  const [ordering, setOrdering] = useState(false);
  const [ordered, setIsOrdered] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setOrdering(true);
    if (!nameIsValid || !streetIsValid || !CityIsValid || !postalCodeIsValid) {
      return;
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://react-98aa1-default-rtdb.firebaseio.com/Orders.json",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstname: street,
                lastname: name,
                City: City,
                postalCode: postalCode,
                order: cartCtx.items,
                totalToPay: totalAmount,
              }),
            }
          );
          setIsOrdered(true);
          if (!response.ok) {
            setIsOrdered(false);
            throw new Error("something went wrong");
          }
          cartCtx.resetCart();
        } catch (error) {}
        setOrdering(false);
      };
      fetchData();
      nameReset();
      CityReset();
      streetReset();
      postalCodeReset();
    }
  };

  const nameInputClasses = nameHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];
  const streetInputClasses = streetHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];
  const CityInputClasses = CityHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];
  const postalCodeInputClasses = CityHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  return (
    <Modal>
      {ordered ? ( // Conditional rendering based on the "ordered" state
        <div className={classes.feedback}>
          <p>Order placed successfully!</p>
          <button onClick={props.onReset} className={classes.buttonAlt}>
            Return
          </button>
        </div>
      ) : ordering ? (
        <div className={classes.orderingFeedback}>
          <p>Ordering...</p>
        </div>
      ) : (
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes["full-control"]}>
            <div className={classes["control-group"]}>
              <div className={streetInputClasses}>
                <label htmlFor="name" className={classes.label}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={streetChangeHandler}
                  onBlur={streetBlurHandler}
                  value={street}
                  className={
                    streetHasError ? classes.invalidInput : classes.input
                  }
                />
                {streetHasError && (
                  <p className={classes["error-text"]}>
                    Please enter a valid First Name
                  </p>
                )}
              </div>
              <div className={nameInputClasses}>
                <label htmlFor="street" className={classes.label}>
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  value={name}
                  className={
                    nameHasError ? classes.invalidInput : classes.input
                  }
                />
                {nameHasError && (
                  <p className={classes["error-text"]}>
                    Please enter a valid Last Name
                  </p>
                )}
              </div>
            </div>
            <div className={postalCodeInputClasses}>
              <label htmlFor="postalCode" className={classes.label}>
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                onChange={postalCodeChangeHandler}
                onBlur={postalCodeBlurHandler}
                value={postalCode}
                className={
                  postalCodeHasError ? classes.invalidInput : classes.input
                }
              />
              {postalCodeHasError && (
                <p className={classes["error-text"]}>
                  Please enter a valid Postal Code
                </p>
              )}
            </div>
            <div className={classes["control-group"]}>
              <div className={CityInputClasses}>
                <label htmlFor="City" className={classes.label}>
                  City
                </label>
                <input
                  type="City"
                  id="City"
                  onChange={CityChangeHandler}
                  onBlur={CityBlurHandler}
                  value={City}
                  className={
                    CityHasError ? classes.invalidInput : classes.input
                  }
                />
                {CityHasError && (
                  <p className={classes["error-text"]}>
                    Please enter a valid City
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={classes.footer}>
            <span className={classes.total}>Total to pay : {totalAmount}</span>

            <div className={classes["form-actions"]}>
              <button onClick={props.onReturn} className={classes.buttonAlt}>
                Return
              </button>
              {formValid && (
                <button
                  type="submit"
                  disabled={!formValid || ordering}
                  className={classes.button}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default OrderForm;
