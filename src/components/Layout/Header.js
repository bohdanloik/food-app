import { Fragment }  from 'react';
import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {

    return (
        <Fragment>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCard}/>
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="Meals" />
            </div>
        </Fragment>
    )
}

export default Header; 