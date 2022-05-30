import styles from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = value => value.trim() === '';
const isNotFiveChart = value => value.trim().length !== 5;

const Checkout = (props) => { 
    const [formsInputValidity, setFormsInputValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    });
    console.log(formsInputValidity, '____formsInputValidity')
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        console.log(enteredName, enteredStreet, enteredPostalCode, enteredCity);

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = !isNotFiveChart(enteredPostalCode);

        setFormsInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid,
        })

        const formIsValid = 
            enteredNameIsValid &&
            enteredStreetIsValid && 
            enteredCityIsValid && 
            enteredPostalCodeIsValid;
        if(!formIsValid) {
            return
        }
        props.onSubmit({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity

        })
    }
    // const nameControlClasses = `${styles.control} ${formsInputValidity.name ? '': styles.invalid}`;

    const сontrolClasses = inputName =>`${styles.control} ${formsInputValidity[inputName] ? '': styles.invalid}`;

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={сontrolClasses('name')}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id='name' ref={nameInputRef} onKeyDown={() => {
                    setFormsInputValidity({...formsInputValidity, name : true })
                }}/>
                {!formsInputValidity.name && <p>Please Enter Your Name</p>}
            </div>
            <div className={сontrolClasses('street')}>
                <label htmlFor="street">Street</label>
                <input type="text" id='street' ref={streetInputRef}/>
                {!formsInputValidity.street && <p>Please Enter Street</p>}
            </div>
            <div className={сontrolClasses('postalCode')}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id='postal' ref={postalCodeInputRef}/>
                {!formsInputValidity.postalCode && <p>Please Enter Your Postal Code</p>}
            </div>
            <div className={сontrolClasses('city')}>
                <label htmlFor="city">City</label>
                <input type="text" id='city' ref={cityInputRef}/>
                {!formsInputValidity.city && <p>Please Enter Your City</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;