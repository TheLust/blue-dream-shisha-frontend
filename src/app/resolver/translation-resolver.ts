import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TranslationService } from '../service/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationResolver implements Resolve<void> {

  constructor(private translationService: TranslationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<void> {
    const prefixList: Array<string> = route.data['prefixList'] as Array<string>;

    return this.translationService.loadTranslationsByPrefixList(prefixList);
  }
}
