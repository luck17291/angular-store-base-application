import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemTodoService implements InMemoryDbService {
  createDb() {
    let tasks = [
      { id: 1, name: 'Task No1', isCompleted: false },
      { id: 2, name: 'Task No2', isCompleted: false },
      { id: 3, name: 'Task No3', isCompleted: false },
      { id: 4, name: 'Task No4', isCompleted: false }
    ];
    return { tasks };
  }
}