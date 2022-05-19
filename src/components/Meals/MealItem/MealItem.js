import MealItemForm from './MealItemForm';
import styles from './MealItem.module.css';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {

    const cartCTX = useContext(CartContext)
    const price = `$${props.price.toFixed(2)}`
    const addToCartHandler = amount => {
        cartCTX.addItem ({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddtoCard={addToCartHandler}/>
            </div>
        </li>
    )
}

export default MealItem;