import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { FoodItem } from '../food-item.model';

@Injectable()
export class FoodDataService extends DefaultDataService<FoodItem> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Food', http, httpUrlGenerator);
  }
}
