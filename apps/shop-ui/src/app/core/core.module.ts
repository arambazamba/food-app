import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const comps = [LoginComponent, NavbarComponent, SidebarComponent];

@NgModule({
  declarations: comps,
  exports: comps,
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class CoreModule {}
