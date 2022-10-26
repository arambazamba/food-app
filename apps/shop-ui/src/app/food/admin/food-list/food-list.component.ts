import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FoodStockItem } from '../../food-stock.model';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit, OnChanges {
  @Input() food: FoodStockItem[] | null = [];
  @Output() foodSelected: EventEmitter<FoodStockItem> =
    new EventEmitter<FoodStockItem>();
  @Output()
  foodDeleted: EventEmitter<FoodStockItem> = new EventEmitter<FoodStockItem>();
  @Output()
  foodAdding: EventEmitter<FoodStockItem> = new EventEmitter<FoodStockItem>();
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'instock',
    'deleteItem',
    'editItem',
  ];
  dataSource = new MatTableDataSource([]);

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource(changes['food'].currentValue);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectFood(p: FoodStockItem) {
    this.foodSelected.emit(p);
  }

  deleteFood(item: FoodStockItem) {
    this.foodDeleted.emit(item);
  }

  addFood() {
    this.foodAdding.emit(new FoodStockItem());
  }
}
