import { Injectable } from '@angular/core';
import { TaskInterface } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: TaskInterface [];

  constructor() {
    this.tasks = [
      // {title: 'leer', description: 'Tengo que leer', hide: true},
      // {title: 'crear un website', description: 'Tengo que crear un website', hide: true},
    ];
   }
  //  Para retornar estas tareas que estoy almacenando en la memoria de mi aplicacion
  //  creo un metodo getTasks() que luego lo podre reutilizar por cualquier otro componente de mi aplicacion
   getTasks() {
     // para obtener todas las tareas que tengo almacenadas en el localStorage
     if (localStorage.getItem('tasks') === null) {
      return this.tasks;
     } else {
       this.tasks = JSON.parse(localStorage.getItem('tasks'));
       return this.tasks;
     }
   }

   addTask(task: TaskInterface) {
    // this.tasks.push(task);
    // en vez de almacenarlo como hasta ahora en un arreglo propio de mi clase vamos a pedirle que lo almacene
    // dentro de mi LocalStorage, asi persisten lo sdatos almacenados aunque actualice la pagina
    // Para guardar con setItem en mi LocalStorage le paso como parametros el nombre de como voy a guardarlo y
    // como valor le pasare mi arreglo de tareas this.tasks, el problema esta en que no le puedo pasar un
    // arreglo o un objeto de JS, tiene que ser un string por eso lo convertimos con el metodo JSON.stringify
    this.tasks.push(task);
    // esto es para que cada vez que se agregue una tarea nueva se agregue a nuestro arreglo
    // de tareas y se muestre
    let tasks: TaskInterface[] = [];
    if (localStorage.getItem('tasks') === null) {
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    // pondre en el contructor mi arreglo de tareas vacio
    } else {
      // con la funcion JSON.parse lo que hago es convertir nuevamente el string que tenemos a un arrego o un objeto.
      // Hace lo contrario a stringify
      tasks = JSON.parse(localStorage.getItem('tasks'));
      // una vez que tiene la nueva tarea, almacenala
      tasks.push(task);
      // este arreglo ahora tendra lo que habia en el arreglo tasks mas lo nuevo que le han introducido, es por eso que
      localStorage.setItem('tasks', JSON.stringify(tasks));

    }
   }

   deleteTask(task: TaskInterface) {
     for (let i = 0; i < this.tasks.length; i++) {
       if (task === this.tasks[i]) {
        //  Aqui lo que esta haciendo es mirar si coincide el valor de la tarea a eleminar con alguno de los
        // elementos del arreglo de tareas y si es asi se elimina con el metodo splice, al que se le pasa el
        // indice el arreglo del elemento a eliminar y el numero de elementos a eliminar
        this.tasks.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
       }
     }
   }
}
