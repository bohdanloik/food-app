import MealsSummary from "./MealsSummary";
import AvaibleMeals from "./AvaibleMeals";
import { Fragment } from "react";

const Meals = () => {
    return (
        <Fragment>
            <MealsSummary />
            <AvaibleMeals />
        </Fragment>
    )
}

export default Meals;