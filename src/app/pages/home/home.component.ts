import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { PublicSwiperService, SwiperImageDto } from '../../api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {

  public swiperImages: Array<SwiperImageDto> = [];

  constructor(private publicSwiperService: PublicSwiperService) {
  }

  ngOnInit(): void {
    this.publicSwiperService.findSwiperImages()
      .subscribe({
        next: (value: Array<SwiperImageDto>) => this.swiperImages = value
      });

    this.swiperImages.sort((a, b) => (
      parseInt(a.index || '0') - parseInt(b.index || '0')
    ));
  }

  public getImageUrl(swiperImageId: string): string {
    const baseUrl = this.publicSwiperService.configuration.basePath;
    return baseUrl + '/api/v1/public/swiper/images/' + swiperImageId;
  }
}
