import { Component, OnInit, Input } from '@angular/core';
// importo un nueva propiedad llamada Input
import { TaskInterface } from '../../models/Task';
// importo la interfaz Task
import { TaskService } from '../../services/task.service';
// importo el servicio TaskService, al hacerlo en el contructor tenemos que hacer una instancia

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  // Este componente va a poder recibir datos desde fuera y para poder pasarlos datos creamos la siguiente entrada
  // por eso necesitamos hacer la importacion
  @Input() task: TaskInterface;

  constructor(
    // aqui creo la instancia, defino una propiedad publica que se llame taskService y que sea de tipo TaskService
    public taskService: TaskService
  ) { }

  ngOnInit() {
  }

  // vamos a utilizar desde el servicio este metodo, y ademas para poder trabajar con el
  // tenemos que importarlo arriba
  deleteTask(task: TaskInterface) {
    // el confirm es una ventana para dar OK
    if (confirm('¿Estás seguro de querer eliminar esta Tarea?')) {
      this.taskService.deleteTask(task);
    }

  }

}
