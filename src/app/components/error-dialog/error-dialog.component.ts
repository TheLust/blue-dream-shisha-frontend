import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogData } from './error-dialog-data';
import { TranslationPipe } from '../../service/translation/translation.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [
    TranslationPipe,
    NgIf
  ],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {

  public descriptionStrategy: 'default' | 'errorCode' = 'default';

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorDialogData) {
    if (data?.showErrorCodeAsDescription) {
      this.descriptionStrategy = 'errorCode';
    }
  }
}
