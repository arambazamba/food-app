import * as React from 'react';
import { useState, useEffect, FC } from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import styles from './FoodListWp.module.scss';
import { IFoodListWpProps } from './IFoodListWpProps';
import { FoodItem } from './food.model';
import { FoodRow } from './food-row/food-row';

export const FoodListWp : FC<IFoodListWpProps> = (props: IFoodListWpProps)=>{
  
  const [food, setFood] = useState([]);
  
  const getSkillsFromSP = async () => {
    const items: any[] = await sp.web.lists.getByTitle("food").items.getAll();  
    setFood(items);
  };

  useEffect(() => {
    sp.setup({
      spfxContext: props.context
    });
    getSkillsFromSP();
  }, []);

  
  return (
     <div className={styles.container}>
       <div className={styles.row}>Available Food</div>
      {
        food.map((f: FoodItem)=>{
            return (<FoodRow item={f} key={f.Id} ></FoodRow>);
        })
      }      
      <div className={styles.row}>Click to delete</div>
    </div>
  );
};