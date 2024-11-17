import { Component, Input } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { TranslationPipe } from '../../service/translation/translation.pipe';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [
    MatError,
    TranslationPipe,
    NgIf,
    MatIcon
  ],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {
  @Input() formErrorCode: string | null = null;
}
