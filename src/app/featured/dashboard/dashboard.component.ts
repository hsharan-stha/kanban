import {
  Component, ElementRef,
  HostBinding,
  OnInit, ViewChild,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopbarComponent} from '@shared/templates/topbar/topbar.component';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {KanbanInterface} from "@shared/interface/kanban.interface";
import {PriorityEnum} from "@shared/enums/priority.enum";
import {MyFilterPipe} from "@pipes/filter-array/filter-array.pipe";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlertifyService} from "@shared/services/alertifyjs/alertify.service";
import {PopupModalService} from "@shared/services/popup-modal/popup-modal.service";
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TopbarComponent, DragDropModule, MyFilterPipe, TranslateModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @HostBinding('class') class = 'app-absolute-layout';
  @ViewChild('taskModal') taskModal: ElementRef;

  public taskForm: FormGroup;

  public todoFilterArgs: string;
  public progressFilterArgs: string;
  public doneFilterArgs: string;
  public todo: Array<KanbanInterface> = [
    {
      id: 1,
      taskName: "Task 1",
      assignDate: 'march 19 2023',
      deadline: "march 23 2024",
      description: "Task to be done before deadline and must be tested as far as better",
      priority: PriorityEnum.LOW
    },
    {
      id: 2,
      taskName: "Task 2",
      assignDate: 'march 19 2023',
      deadline: "march 23 2024",
      description: "Task to be done before deadline and must be tested as far as better",
      priority: PriorityEnum.MEDIUM
    }
  ];
  public inProgress: Array<KanbanInterface> = [
    {
      id: 3,
      taskName: "Task 3",
      assignDate: 'march 19 2023',
      deadline: "march 23 2024",
      description: "Task to be done before deadline and must be tested as far as better",
      priority: PriorityEnum.LOW
    },
    {
      id: 4,
      taskName: "Task 4",
      assignDate: 'march 19 2023',
      deadline: "march 23 2024",
      description: "Task to be done before deadline and must be tested as far as better",
      priority: PriorityEnum.MEDIUM
    }
  ]
  public done: Array<KanbanInterface> = [{
    id: 5,
    taskName: "Task 6",
    assignDate: 'march 19 2023',
    deadline: "march 23 2024",
    description: "Task to be done before deadline and must be tested as far as better",
    priority: PriorityEnum.HIGH
  },
    {
      id: 6,
      taskName: "Task 7",
      assignDate: 'march 19 2023',
      deadline: "march 23 2024",
      description: "Task to be done before deadline and must be tested as far as better",
      priority: PriorityEnum.HIGH
    }];


  constructor(private formBuilder: FormBuilder,
              private popupModalService: PopupModalService,
              private alertifyService: AlertifyService) {

  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      id: [''],
      taskName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      assignDate: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
    });

  }

  public drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  public openTaskModal(type: string = 'add'): void {
    if (type == 'add') {
      this.taskForm.reset();
    }
    this.popupModalService.openLg(this.taskModal, 'lg', true);
  }

  public onSubmit(): void {

    if (this.taskForm.invalid) {
      this.alertifyService.error("Invalid Data")
      return;
    }

    if (this.taskForm.get('id').value) {
      this.todo = this.todo.filter((i: KanbanInterface) => i.id == this.taskForm.get('id').value)
    }

    let value = {...this.taskForm.value, id: this.todo.length};
    this.todo.push(value);

    this.popupModalService.dismissAll();
  }


  public searchTask($event, type) {
    this.todoFilterArgs = type == 'todo' && $event.target.value;
    this.progressFilterArgs = type == 'progress' && $event.target.value;
    this.doneFilterArgs = type == 'done' && $event.target.value;
  }


  public editTodo(item: KanbanInterface) {
    this.taskForm.patchValue(item);

    this.openTaskModal('edit');
  }

  public deleteTodo(item: KanbanInterface) {
    this.todo = this.todo.filter((i: KanbanInterface) => i.id == item.id)
  }

}
