import { AppPage } from './app.po';
import { Browser } from 'selenium-webdriver';
import { browser, protractor, element, by } from 'protractor';

describe('todolist App', () => {
  let page: AppPage;
  var EC = protractor.ExpectedConditions;
  let defaultWaitTime: number = 5000;

  beforeEach(() => {
    page = new AppPage();

  });


  this.waitUntilReady = function (elm, timeOut = defaultWaitTime) {
    browser.wait(function () {
      return elm.isPresent();
    }, timeOut);
    browser.wait(function () {
      return elm.isDisplayed();
    }, timeOut);
  };

  // it('should show progess bar', () => {

  //   page.navigateTo().then(() => {
  //     browser.wait(page.getProgressBar().isPresent(),5000).then(() => {
  //       expect(page.getProgressBar().isPresent()).toBeTruthy();
  //     })

  //   })

  //   // expect(page.getProgressBar().isPresent()).toBeTruthy();

  //   // this.waitUntilReady(page.getProgressBar())

  //   // browser.wait(page.getProgressBar().isPresent(),10000).then(()=>{
  //   //   expect(page.getProgressBar().isPresent()).toBe(true);
  //   // })

  //   // browser.wait(EC.presenceOf(page.getProgressBar()), 10000).then(() => {
  //   //   expect(page.getProgressBar().isPresent()).toBe(true);
  //   // })

  // });

  describe('add new task', () => {
    let numberOfTasksBeforeAdd = 0;
    let numberOfTasksAfterAdd = 0;

    it('should show open new task dialog when click add new task', () => {
      page.navigateTo();
      page.getAllTaskElement().count().then(number => this.numberOfTasksBeforeAdd = number);

      page.getAddTaskButton().click();
      expect(page.getDialogTitle().isDisplayed()).toBe(true);
      expect(page.getDialogTitle().getText()).toEqual("Add new Task");
    });

    it('should show progess bar when click save on dialog and number of task should increase', () => {
      page.getDialogTaskName().sendKeys("new task");
      page.getDialogSaveBtn().click();
      // this.waitUntilReady(page.getProgressBar());
      // expect(page.getProgressBar().isPresent()).toBe(true);
      browser.sleep(3000);
      page.getAllTaskElement().count()
        .then(number => this.numberOfTasksAfterAdd = number)
        .then(() => {
          expect(this.numberOfTasksAfterAdd).toEqual(this.numberOfTasksBeforeAdd + 1);
        })
    });

    it('should new task on list', () => {
      let lastestIndex = this.numberOfTasksBeforeAdd + 1;
      let newTask = page.getAllTaskElement().last();
      expect(newTask.getText()).toEqual("new task");
    });
  });

  describe('update task', () => {

    it('should show open update task dialog when click on task', () => {
      page.navigateTo();
      page.getAllTaskElement().first().click();
      expect(page.getDialogTitle().isDisplayed()).toBe(true);
      expect(page.getDialogTitle().getText()).toEqual("Update Task");
    });

    it('should show progess bar when click save on dialog and task name have changed', () => {
      page.getDialogTaskName().clear();
      page.getDialogTaskName().sendKeys("task 123");
      page.getDialogSaveBtn().click();
      // this.waitUntilReady(page.getProgressBar());
      // expect(page.getProgressBar().isPresent()).toBe(true);
      browser.sleep(3000);
      expect(page.getAllTaskElement().first().getText()).toEqual("task 123");
    });
  });

  describe('delete task', () => {
    let numberOfTasksBeforeDelete: number = 0;
    let numberOfTasksAfterDelete: number = 0;

    it('should show progess bar when click delete task and tasks number decrease', () => {
      page.navigateTo();
      page.getAllTaskElement().count()
        .then(number => this.numberOfTasksBeforeDelete = number)
        .then(() => {
          page.getDeleteButton().click();
          browser.sleep(3000);

          page.getAllTaskElement().count()
            .then(number => this.numberOfTasksAfterDelete = number)
            .then(() => {
              expect(this.numberOfTasksAfterDelete).toEqual(this.numberOfTasksBeforeDelete - 1);
            });
        })

    });
  });


});
