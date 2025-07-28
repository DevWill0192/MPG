import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // Los componentes son standalone, no necesitan estar en declarations
    HomeComponent,
    LoginComponent
  ],
  exports: [
    HomeComponent,
    LoginComponent
  ]
})
export class PagesModule { }
