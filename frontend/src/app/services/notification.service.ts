import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  options: any = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      ...this.options,
      duration,
    });
  }

  showException(e: HttpErrorResponse, duration: number = 3000): void {
    this.snackBar.open(
      e?.error?.message ?? e?.message ?? 'Exception occured',
      'Close',
      {
        ...this.options,
        duration,
      }
    );
  }
}
