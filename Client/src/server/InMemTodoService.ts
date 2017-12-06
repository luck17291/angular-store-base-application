import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemTodoService implements InMemoryDbService {
  createDb() {
    let tasks = [
      { id: 1, Name: 'Task No1', IsCompleted: false },
      { id: 2, Name: 'Task No2', IsCompleted: false },
      { id: 3, Name: 'Task No3', IsCompleted: false },
      { id: 4, Name: 'Task No4', IsCompleted: false }
    ];
    return { tasks };
  }
}