import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { TranslationPipe } from '../../service/translation/translation.pipe';
import { TranslationService } from '../../service/translation/translation.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    LoginComponent,
    MatTabGroup,
    MatTab,
    LoadingSpinnerComponent,
    TranslationPipe
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit{

  isLoadingLogin: boolean = false;
  isLoadingRegister: boolean = false;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.loadTranslationsByPrefixList([
      'FE_AUTH_',
      'FE_LOGIN_',
      'FIELD_ERROR_LOGIN_'
    ]);
  }
}
