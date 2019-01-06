import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskInterface } from '../../models/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: TaskInterface[];

  constructor(public  taskService: TaskService) { }

  ngOnInit() {
    // cada componente tiene este metodo que es un metodo que se ejecuta a penas el componente es creado
    // por eso crearemos el metodo de obtener tareas dentro de el, para que a penas sea creado muestre
    // todas las tareas aqui
    this.tasks = this.taskService.getTasks();
    // este metodo me retorna todas las tareas que tiene en memoria pero ademas necesitamos almacenar
    // el arreglo que me devuelve este metodo en algun lugar, por eso creamos
    // arriba un arreglo de tareas llamado tasks e importamos nuestra clase Tareas que esta en Models
  }

}
