import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { environment } from 'src/environments/environment';
import { FoodCatalogItem } from '../../food-catalog.model';

@Injectable()
export class FoodDataService extends DefaultDataService<FoodCatalogItem> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Food', http, httpUrlGenerator);
  }

  // .NET App PUT has a different signature than the default
  // PUT http://localhost:PORT/food
  override update(skill: Update<FoodCatalogItem>) {
    return this.http.put<FoodCatalogItem>(`${environment.api}food`, {
      ...skill.changes,
    });
  }
}
