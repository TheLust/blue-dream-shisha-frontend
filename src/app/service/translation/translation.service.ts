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

  loadTranslationsByPrefixList(prefixList: Array<string>): void {
    this.publicI18nService.searchTranslationsByPrefixList(
      'en',
      {prefix_list: prefixList}
    ).subscribe({
      next: value => {
        const translationByCode: Map<string, string> = new Map(Object.entries(value));
        const updatedTranslations: Map<string, string> = new Map([...translationByCode, ...this.translations.getValue()]);
        this.translations.next(updatedTranslations);
      }
    });
  }

  getTranslations(): Observable<Map<string, string>> {
    return this.translations.asObservable();
  }
}
