import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { NgIf } from "@angular/common";
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf,
    MatProgressBar
  ],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.scss'
})
export class LoadingBarComponent {
  @Input() isLoading: boolean = false;
}
