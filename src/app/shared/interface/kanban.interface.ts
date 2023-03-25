import {PriorityEnum} from "@shared/enums/priority.enum";

export interface KanbanInterface {
  id?: number,
  taskName: string,
  assignDate: string,
  deadline: string,
  description: string,
  priority: PriorityEnum

}


