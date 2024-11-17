import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';

@Pipe({
  name: 'translation',
  standalone: true,
  pure: false
})
export class TranslationPipe implements PipeTransform {
  private translations: Map<string, string> = new Map();

  constructor(private translationService: TranslationService) {
    this.translationService.getTranslations().subscribe((data) => {
      this.translations = data;
    });
  }

  transform(value: string | null): string | null {
    if (value) {
      return this.translations.get(value) || value;
    } else {
      return null;
    }
  }
}
