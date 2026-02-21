import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ico-sidebar-exam',
  imports: [],
  templateUrl: './ico-sidebar-exam.component.html',
  styleUrl: './ico-sidebar-exam.component.scss'
})
export class IcoSidebarExamComponent {
  @Input() size: string = "w-6";
  @Input() fillColor: string = "fill-gray-800";
}
