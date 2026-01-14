import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [NgClass],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  @Input() icostyle: string = "w-32";
}
