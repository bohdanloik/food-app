import { useRef } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemFrom = (props) => {
    const amountInputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        console.log(enteredAmount);
        props.onAddtoCard(enteredAmountNumber)
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input 
                ref={amountInputRef}
                label='Amount' 
                input={{
                id: 'amount' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1',
            }}/>
            <button type='submit' className={styles.button}> + Add</button>
        </form>
    )
}

export default MealItemFrom;