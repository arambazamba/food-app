import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EuroPipe } from './euro.pipe';

@NgModule({
  declarations: [EuroPipe],
  exports: [EuroPipe],
  imports: [CommonModule],
})
export class UtilsModule {}
