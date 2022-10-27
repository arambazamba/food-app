import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  execCheckout() {
    return this.http.post('http://localhost:3000/checkout', checkoutItem);
  }
}
