import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {

  private _state = new BehaviorSubject<{
    visible: boolean;
    title?: string;
    subtitle?: string;
    message?: string;
    buttonConfirm?: string;
    buttonCancel?: string;
    resolve?: (value: boolean) => void;
  }>({ visible: false });

  state$ = this._state.asObservable();

  open(title: string, subtitle: string, message: string, options?: { buttonConfirm?: string, buttonCancel?: string }): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this._state.next({
        visible: true,
        title,
        subtitle,
        message,
        buttonConfirm: options?.buttonConfirm ?? 'Confirmer',
        buttonCancel: options?.buttonCancel ?? 'Annuler',
        resolve: (result: boolean) => {
          observer.next(result);
          observer.complete();
        }
      });
    });
  }

  close(result: boolean) {
    this._state.value.resolve?.(result);
    this._state.next({ visible: false });
  }
}
