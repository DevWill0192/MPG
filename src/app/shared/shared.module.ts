import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importar componentes standalone que se usan frecuentemente
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InputComponent } from './components/input/input.component';
import { CircleProgressComponent } from './components/circle-progress/circle-progress.component';
import { TrimDecimalPipe } from '../core/pipes/trim-decimal.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // Componentes standalone que se usan frecuentemente
    HeaderComponent,
    FooterComponent,
    InputComponent,
    CircleProgressComponent,
    TrimDecimalPipe
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // Exportar componentes para uso en otros módulos
    HeaderComponent,
    FooterComponent,
    InputComponent,
    CircleProgressComponent,
    TrimDecimalPipe
  ]
})
export class SharedModule { }
