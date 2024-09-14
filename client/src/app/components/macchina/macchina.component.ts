import { Component, Input } from '@angular/core';
import { Car, CarBrand } from '../../models/macchina.model';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-macchina',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './macchina.component.html',
  styleUrl: './macchina.component.scss'
})
export class MacchinaComponent {

  @Input() brand: keyof CarBrand | null = null
  @Input() macchina: Car | null = null

}
