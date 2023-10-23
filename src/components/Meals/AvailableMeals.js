import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true)
      try {
        const response = await fetch(
          "https://react-98aa1-default-rtdb.firebaseio.com/Meals.json/"
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();

        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        setErr(error.message);
        setIsLoading(false);
      }
    }

    fetchMeals();
  }, []);

  let content;

  if (isLoading) {
    content = <p  className={classes.load}>Loading...</p>;
  } else if (err && !isLoading) {
    content = <p className={classes.error}>{err}</p>;
  } else {
    content = (
      <ul>
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
      </ul>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
