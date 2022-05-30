import React, { useContext, useState } from 'react';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import styles from './Cart.module.css';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCTX = useContext(CartContext);
    const isItem = cartCTX.items.length > 0;
    const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;

    const onRemoveItemHandler= (id) => {
        cartCTX.removeItem(id);
        console.log(id, ' ID CARD')
        
    };

    const onAddItemHandler= (item) => {
        cartCTX.addItem({...item, amount: 1})
    }
    const orderCheckoutHndler = () => {
        setIsCheckout(true)
    }
    const submitOrderHandler = async userData => {
        setIsSubmiting(true);
        await fetch('https://food-app-d0d97-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCTX.items
        })
    })
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCTX.clearCard();
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
    const modalActions = (
        <div className={styles.actions}>
            <button 
                className={styles['button--alt']} 
                onClick={props.onHideCart}>
                Close 
            </button>
        {isItem && <button 
                        className={styles.button} 
                        onClick={orderCheckoutHndler}>
                        Order
                        </button> }
        </div>)
    const cartModalContent = (
        <React.Fragment>
            {cartitems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onSubmit={submitOrderHandler} onCancel={props.onHideCart}/>}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmitingModalContent = <p>Sending Order Data...</p>;
    const didSubmitModalContent = (
    <React.Fragment>
        <p>Successfully Send the Order</p>
        <div className={styles.actions}>
            <button 
                className={styles.button} 
                onClick={props.onHideCart}>
                Close 
            </button>
        </div>
    </React.Fragment>
    );
    return (
    <Modal onClose={props.onHideCart}>
        {!isSubmiting && !didSubmit &&cartModalContent}
        {isSubmiting && isSubmitingModalContent}
        {didSubmit && !isSubmiting && didSubmitModalContent}
    </Modal>
    )
}

export default Cart;