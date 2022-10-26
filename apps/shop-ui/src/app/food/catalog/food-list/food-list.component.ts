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
import { FoodCatalogItem } from '../../food-catalog.model';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit, OnChanges {
  @Input() food: FoodCatalogItem[] | null = [];
  @Output() foodSelected: EventEmitter<FoodCatalogItem> =
    new EventEmitter<FoodCatalogItem>();
  @Output()
  foodDeleted: EventEmitter<FoodCatalogItem> = new EventEmitter<FoodCatalogItem>();
  @Output()
  foodAdding: EventEmitter<FoodCatalogItem> = new EventEmitter<FoodCatalogItem>();
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

  selectFood(p: FoodCatalogItem) {
    this.foodSelected.emit(p);
  }

  deleteFood(item: FoodCatalogItem) {
    this.foodDeleted.emit(item);
  }

  addFood() {
    this.foodAdding.emit(new FoodCatalogItem());
  }
}
