import { Injectable } from '@angular/core';
import { PublicI18nService } from '../../api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translations: BehaviorSubject<Map<string, string>> = new BehaviorSubject<Map<string, string>>(
    new Map<string, string>()
  );

  constructor(private publicI18nService: PublicI18nService) {
  }

  loadTranslations(): void {
    this.publicI18nService.getTranslations('en').subscribe({
      next: value => {
        const translationByCode: Map<string, string> = new Map(Object.entries(value));
        this.translations.next(translationByCode);
      }
    });
  }

  getTranslations(): Observable<Map<string, string>> {
    return this.translations.asObservable();
  }
}
