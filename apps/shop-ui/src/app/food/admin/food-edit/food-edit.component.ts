import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodStockItem } from '../../food-stock.model';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.scss'],
})
export class FoodEditComponent {
  @Input() food: FoodStockItem = new FoodStockItem();
  @Output() saveFood: EventEmitter<FoodStockItem> = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: this.food.id,
      name: [this.food.name, [Validators.required, Validators.minLength(3)]],
      inStock: [this.food.inStock, [Validators.required, Validators.min(1)]],
      price: this.food.price,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['food']) {
      this.form.setValue(changes['food'].currentValue);
    }
  }

  saveForm(form: any) {
    console.log('food to save', form.value);
    this.saveFood.emit(form.value);
  }
}