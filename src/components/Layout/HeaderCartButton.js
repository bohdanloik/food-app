import CartIcon from '../Cart/CartIcon';
import { useContext, useEffect, useState } from 'react';
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const cartCTX = useContext(CartContext);
    const { items }= cartCTX;
    const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);

    const numberOfCartItem = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);
    const btnClasses = `${styles.button} ${btnIsHighLighted ? styles.bump : ''}`;

    useEffect(() => {
        if(items.length === 0) { 
            return;
        }
        setBtnIsHighLighted(true)
        const timer = setTimeout(() => {
            setBtnIsHighLighted(false)
        }, 300)
        
        return  () => {
            clearTimeout(timer);
        }
    }, [items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}>
               <CartIcon /> 
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItem}</span>
        </button>
    )
};
export default HeaderCartButton;