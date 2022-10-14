import * as React from 'react';
import { FC } from 'react';
import { FoodItem } from '../food.model';
import './food-row.css';

export interface IFoodRowProps {
	item: FoodItem;
}

export const FoodRow : FC<IFoodRowProps> = (props: IFoodRowProps )=>{
    const foodClicked = ()=> {console.log(`deleting food:  ${ props.item.Title}`);};
    return(
        <div className="foodRow" onClick={foodClicked}>
            {props.item.Title}
        </div>
    );
};