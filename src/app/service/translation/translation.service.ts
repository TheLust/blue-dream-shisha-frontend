import { Injectable } from '@angular/core';
import { PublicI18nService } from '../../api';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translations: BehaviorSubject<Map<string, string>> = new BehaviorSubject<Map<string, string>>(
    new Map<string, string>()
  );

  private usedPrefixList: Array<string> = new Array<string>();

  constructor(private publicI18nService: PublicI18nService) {
  }

  loadTranslationsByPrefixList(prefixList: Array<string>): Promise<void> {
    const unusedPrefixList: Array<string> = prefixList.filter((prefix: string) => {
      return !this.usedPrefixList.includes(prefix);
    });

    if (unusedPrefixList.length == 0) {
      return Promise.resolve();
    }

    return lastValueFrom(
      this.publicI18nService.searchTranslationsByPrefixList(
        'en',
        {prefix_list: unusedPrefixList}
      )
    ).then((value) => {
      const translationByCode: Map<string, string> = new Map(Object.entries(value));
      const updatedTranslations: Map<string, string> = new Map([...translationByCode, ...this.translations.getValue()]);
      this.usedPrefixList.push(...unusedPrefixList);
      this.translations.next(updatedTranslations);
    });
  }

  getTranslations(): Observable<Map<string, string>> {
    return this.translations.asObservable();
  }

  getTranslation(code: string): string | undefined {
    return this.translations.getValue().get(code);
  }
}
