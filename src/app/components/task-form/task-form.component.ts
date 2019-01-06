import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  constructor( public taskService: TaskService) { }

  ngOnInit() {
  }

  addTask(newTitle: HTMLInputElement, newDescription: HTMLInputElement) {
    console.log('adding...', newTitle.value, newDescription.value);
    this.taskService.addTask({
      title: newTitle.value,
      description: newDescription.value,
      hide: true
    });
    // Y Una vez que le hemos pasado los valores a mi lista de tareas limpio los inputs
    newTitle.value = '';
    newDescription.value = '';
    // Y tambien quiero posicionar el cursor para añadir una siguiente tarea
    // esto se hace con el metodo focus() que posiciona el cursor ahi donde
    // le estamos diciendo que vaya
    newTitle.focus();
    return false;
  }

}
