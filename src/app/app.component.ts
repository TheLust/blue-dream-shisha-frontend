import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatButton, MatIconButton } from '@angular/material/button';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { AuthService, LoginRequest, ModelError } from './api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatButton,
    NgIf,
    MatToolbar,
    MatIcon,
    MatIconButton,
    NgOptimizedImage
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {

  constructor(public authService: AuthService) {
  }

  public login() {
    this.authService.login({
      username: "gigel",
      password: "Marcel1@1"
    }, 'body').subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {
        console.log(err.error);
      }
    });
  }

}
