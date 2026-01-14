import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ico-loupe',
  imports: [NgClass],
  templateUrl: './ico-loupe.component.html',
  styleUrl: './ico-loupe.component.scss'
})
export class IcoLoupeComponent {
  @Input() width = "w-4";
}
