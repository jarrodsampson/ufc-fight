import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaSearchFilter',
  pure: false
})
export class MediaSearchPipe implements PipeTransform {
  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(
      item => item.title.toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1 ||
              item.description.toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1);
  }
}
