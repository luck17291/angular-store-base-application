import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportMaterialModule } from '../../material.module';
import { TodoComponent } from './todo.component';
import { Task } from '../../models/task';
import { Observable } from 'rxjs/Observable';

describe('test dump component', () => {
    let component: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;
    const task1 = { Id: 1, Name: "task 1", IsCompleted: false } as Task;
    const task2 = { Id: 2, Name: "task 2", IsCompleted: false } as Task;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoComponent],
            imports: [ImportMaterialModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoComponent);
        component = fixture.componentInstance;
        component.tasks$ = new Observable(o => o.next([task1, task2]))
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit onUpdate when click update', () => {
        spyOn(component.onUpdate, 'emit');

        let nativeElement = fixture.nativeElement;
        let fistTask = nativeElement.querySelectorAll('mat-list-item')[0].querySelector('a');
        fistTask.dispatchEvent(new Event('click'));

        fixture.detectChanges();

        expect(component.onUpdate.emit).toHaveBeenCalledWith(task1);
    });

    it('should emit onDelete when click delete', () => {
        spyOn(component.onDelete, 'emit');

        let nativeElement = fixture.nativeElement;
        let fistTask = nativeElement.querySelectorAll('mat-list-item')[0].querySelector('mat-icon');
        fistTask.dispatchEvent(new Event('click'));

        fixture.detectChanges();

        expect(component.onDelete.emit).toHaveBeenCalledWith(task1);
    });
});
