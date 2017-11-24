import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('.e2e-app-title')).getText();
  }

  getReloadButton() {
    return element(by.css('.e2e-reload-btn'));
  }

  getAddTaskButton() {
    return element(by.css('.e2e-add-task-btn'));
  }

  getDeleteButton() {
    return element(by.css('.e2e-delete-task-btn'));
  }

  getProgressBar() {
    return element(by.css('.e2e-progess-bar'));
  }

  getTaskElement() {
    return element(by.css('.e2e-task'));
  }

  getAllTaskElement() {
    return element.all(by.css('.e2e-task'));
  }

  getDialogTitle() {
    return element(by.css('.e2e-dialog-title'));
  }

  getDialogTaskName() {
    return element(by.css('.e2e-dialog-task-name'));
  }

  getDialogSaveBtn() {
    return element(by.css('.e2e-dialog-save-btn'));
  }
}
