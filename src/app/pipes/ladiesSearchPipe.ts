import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ladiesSearchFilter',
  pure: false
})
export class LadiesSearchPipe implements PipeTransform {
  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(
      item => item.last_name.toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1 ||
      item.first_name.toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1 ||
      item.country_residing.toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1);
  }
}
