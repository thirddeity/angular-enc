import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'back-button',
  imports: [CommonModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
