import {Pipe, PipeTransform} from '@angular/core';
import {KanbanInterface} from "@shared/interface/kanban.interface";

@Pipe({
  name: 'myfilter',
  pure: false,
  standalone: true
})
export class MyFilterPipe implements PipeTransform {
  transform(items: KanbanInterface[], filter: string): any {

    console.log(items, filter);

    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.taskName.indexOf(filter) !== -1);
  }
}
