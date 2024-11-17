import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent implements AfterViewInit {
  @Input() isLoading: boolean = false;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    const containerElement = this.elementRef.nativeElement.querySelector('.container');
    if (containerElement) {
      const contentElement = containerElement.firstElementChild;
      if (contentElement) {
        const borderRadius = getComputedStyle(contentElement).borderRadius;

        const overlay = this.elementRef.nativeElement.querySelector('.overlay');
        if (overlay && borderRadius) {
          this.renderer.setStyle(overlay, 'border-radius', borderRadius);
        }
      }
    }
  }
}
