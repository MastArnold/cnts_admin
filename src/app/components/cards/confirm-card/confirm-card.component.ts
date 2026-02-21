import { Component, inject } from '@angular/core';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-card',
  imports: [],
  templateUrl: './confirm-card.component.html',
  styleUrl: './confirm-card.component.scss'
})
export class ConfirmCardComponent {
  
  dialogService = inject(ConfirmDialogService);

  constructor() {
    this.dialogService.state$.subscribe(s => this.state = s);
  }

  state = this.dialogService['_state'].value;

  confirm() {
    this.dialogService.close(true);
  }

  cancel() {
    this.dialogService.close(false);
  }
}
