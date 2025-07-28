import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() value: string = '';
  @Input() placeholder: string = 'Ingrese un valor';
  @Input() type: string = 'checkbox';
  @Input() checked: boolean = false;
  @Input() label: string = 'checkbox';
  @Input() id: string = 'input-id';
  @Input() name: string = 'input-name';

  @Output() checkedChange = new EventEmitter<boolean>();

  signalValue = signal(this.checked);

  onCheckboxChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.signalValue.set(isChecked);
    this.checkedChange.emit(isChecked); // 🔹 Avisar al padre
  }
}
