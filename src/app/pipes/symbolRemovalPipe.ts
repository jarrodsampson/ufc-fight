import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symbolRemoval',
  pure: false
})
export class SymbolRemovalPipe implements PipeTransform {
  transform(item: string, symbol: string): string {
    if (!item) {
      return;
    }
    return item.replace(symbol," ");
  }
}
