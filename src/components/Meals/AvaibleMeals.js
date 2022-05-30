import styles from './AvaibleMeals.module.css';
import Cart from '../UI/Cart';
import MealItem from './MealItem/MealItem';

import { useState, useEffect } from 'react';

const AvaibleMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpErrorMessage, setHttpErrorMessage] = useState(null)
    
    useEffect(()=> {

     const mealsDataFetch = async () => {
       const responce = await fetch('https://food-app-d0d97-default-rtdb.europe-west1.firebasedatabase.app/maeals.json');

       if(!responce.ok) {
         throw new Error('Something went wrong');
       }

       const responceData = await responce.json();
       const loadedMeals = [];

       for(const key in responceData) {
        loadedMeals.push({
          id: key,
          name: responceData[key].name,
          price: responceData[key].price,
          description: responceData[key].description,
        })
       }

       setMeals(loadedMeals);
       setIsLoading(false);
     };
     
     mealsDataFetch().catch(error => {
      setIsLoading(false);
      setHttpErrorMessage(error.message);
     });
    }, [])

    if (isLoading) {
      return (
        <section className={styles.meals__loading}>
          <p>LOADING...</p>
        </section>
      )
    }

    if (httpErrorMessage) {
      return (
        <section className={styles.meals__error}>
          <p>{httpErrorMessage}</p>
        </section>
      )
    }

    const mealsList = meals.map(meal => <MealItem 
      id={meal.id}
      key={meal.id} 
      name={meal.name} 
      description={meal.description} 
      price={meal.price}/>);

    return (
        <section className={styles.meals}>
           <Cart> 
               <ul>
                  {mealsList}
                </ul>
            </Cart>
        </section>
    )
}

export default AvaibleMeals;