import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

@Pipe({
  standalone: true,
  name: 'localForeignTranslate',
  pure: false,
})
export class LocalForeignTranslatePipe implements PipeTransform {
  constructor(private localStorageService: LocalStorageService) {}

  transform(value: unknown, ...args: unknown[]): unknown {
    let lang = this.localStorageService.getLanguageKey();
    return lang?.includes('en') ? value : args;
  }
}
