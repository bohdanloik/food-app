import { useContext } from 'react';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import styles from './Cart.module.css';

const Cart = (props) => {
    
    const cartCTX = useContext(CartContext)
    const isItem = cartCTX.items.length > 0;
    const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;
    const onRemoveItemHandler= (id) => {
        cartCTX.removeItem(id);
        console.log(id, ' ID CARD')
        
    };
    const onAddItemHandler= (item) => {
        cartCTX.addItem({...item, amount: 1})
    }
    const cartitems = <ul>{cartCTX.items.map(item => (
        <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price}
            onRemove={onRemoveItemHandler.bind(null, item.id)}
            onAdd={onAddItemHandler.bind(null, item)}/>
    ))}</ul>
    
    return (
    <Modal onClose={props.onHideCart}>
        {cartitems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
           {isItem && <button className={styles.button}>Order</button> }

        </div>
    </Modal>
    )
}

export default Cart;