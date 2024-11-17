import { finalize, Observable } from 'rxjs';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  template: ''
})
export abstract class LoadingComponent {
  @Output() isLoadingChange: EventEmitter<boolean> = new EventEmitter();

  isLoading: boolean = false;


  protected toggleIsLoadingWhenFetchDataStrategy: 'always' | 'never' = 'always';

  fetchData<T>(observable: Observable<T>, toggleIsLoadingParam?: boolean): Observable<T> {
    const toggleIsLoading: boolean = toggleIsLoadingParam
      ? toggleIsLoadingParam
      : this.toggleIsLoadingWhenFetchDataStrategy == 'always';

    if (toggleIsLoading) {
      this.isLoading = true;
      this.isLoadingChange.emit(true);
    }

    return observable.pipe(
      finalize(() => {
        if (this.isLoading) {
          this.isLoading = false;
          this.isLoadingChange.emit(false);
        }
      })
    );
  }
}
