import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('ReservationComponent.ngOnInit()');
  }
}
