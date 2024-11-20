import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { TranslationPipe } from '../../service/translation/translation.pipe';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    LoginFormComponent,
    MatTabGroup,
    MatTab,
    LoadingSpinnerComponent,
    TranslationPipe
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  isLoadingLogin: boolean = false;
  isLoadingRegister: boolean = false;
}
