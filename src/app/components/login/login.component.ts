import { Component } from '@angular/core';
import { FormComponent } from '../generic/form/form.component';
import { AuthResponse, AuthService, FieldError, LoginRequest } from '../../api';
import { Observable } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { TranslationPipe } from '../../service/translation/translation.pipe';
import { FormErrorComponent } from '../form-error/form-error.component';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    LoadingSpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    MatError,
    TranslationPipe,
    FormErrorComponent,
    LoadingBarComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends FormComponent<LoginRequest, AuthResponse> {

  constructor(private authService: AuthService) {
    super(new FormGroup<any>({
      username: new FormControl(
        "",
        [
          Validators.required
        ]
      ),
      password: new FormControl(
        "",
        [
          Validators.required
        ]
      )
    }));
  }

  login(): void {
    this.submit().then(value => console.log(value));
  }

  action(request: LoginRequest): Observable<AuthResponse> {
    return this.authService.login(request);
  }

  check(request: LoginRequest): Observable<Array<FieldError>> | null {
    return this.authService.checkLoginRequest(request);
  }

  fieldErrorCodeMappings(): Map<string, Map<string, string>> | null {
    return new Map<string, Map<string, string>>([
      [
        'username',
        new Map<string, string>([
          ['required', 'FIELD_ERROR_LOGIN_USERNAME_BLANK']
        ])
      ],
      [
        'password',
        new Map<string, string>([
          ['required', 'FIELD_ERROR_LOGIN_PASSWORD_BLANK']
        ])
      ]
    ]);
  }
}
