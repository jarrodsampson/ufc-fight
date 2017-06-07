import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventSearchFilter',
  pure: false
})
export class EventSearchPipe implements PipeTransform {
  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(
      item => item.base_title.toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1 ||
      item.location.toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1 ||
      item.arena.toLowerCase().indexOf(filter['name'].toLowerCase()) !== -1);
  }
}
