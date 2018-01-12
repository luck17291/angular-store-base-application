import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message, MessageType } from '../../models/message';
import { Store } from '@ngrx/store';
import * as task from '../../reducers';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';


@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {
  message$: Observable<Message>
  constructor(
    private store: Store<task.State>,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
  ) {
    this.message$ = store.select('task').select('message');
    this.toastyConfig.theme = 'material';
  }

  ngOnInit() {
    this.message$.subscribe(msg => {
      if (msg && msg.content) {
        let toastOptions: ToastOptions = {
          title: null,
          msg: msg.content,
          showClose: true,
          // timeout: 5000,
          theme: 'material',
          onAdd: (toast: ToastData) => {
            console.log('Toast ' + toast.id + ' has been added!');
          },
          onRemove: function (toast: ToastData) {
            console.log('Toast ' + toast.id + ' has been removed!');
          }
        };
        switch (msg.type) {
          case MessageType.Error:
            this.toastyService.error(toastOptions);
            break;
          case MessageType.Info:
            this.toastyService.info(toastOptions);
            break;
          case MessageType.Success:
            this.toastyService.success(toastOptions);
            break;
          case MessageType.Warning:
            this.toastyService.warning(toastOptions);
            break;
          default:
            break;
        }
      }
    });
  }
}
