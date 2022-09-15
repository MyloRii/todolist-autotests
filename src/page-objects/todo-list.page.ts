import { Locator, Page } from '@playwright/test'

export class TodoListPage {
  readonly page: Page
  readonly pageHeader: Locator
  readonly todoInput: Locator
  readonly addedTodos: Locator
  readonly todoItemsCount: Locator
  readonly toggleAllItemsBtn: Locator
  readonly clearCompletedBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.pageHeader = page.locator('//h1')
    this.todoInput = page.locator('input[class=new-todo]')
    this.addedTodos = page.locator('.view label')
    this.todoItemsCount = page.locator('//span[@class="todo-count"]/strong')
    this.toggleAllItemsBtn = page.locator('label[for=toggle-all]')
    this.clearCompletedBtn = page.locator('.clear-completed')
  }

  async getTodolistName() {
    return this.pageHeader.textContent()
  }

  async fillTodoName(todoName: string) {
    await this.todoInput.type(todoName)
  }

  async addTodo(todoName: string) {
    await this.fillTodoName(todoName)
    await this.page.keyboard.press('Enter')
  }

  async getTodosList() {
    return this.addedTodos.allTextContents()
  }

  async getItemsLeftCount() {
    return this.todoItemsCount.textContent()
  }

  async deleteTodo(todoNameToDelete: string) {
    await this.page.locator(`//label[.='${todoNameToDelete}']/../input`).hover()
    await this.page.locator(`//label[.='${todoNameToDelete}']/following-sibling::button`).click()
  }

  async completeTodo(todoName: string) {
    await this.page.locator(`//label[.='${todoName}']/../input`).click()
  }

  async openTodoItems(itemsStatus: TodoItemsStatus) {
    await this.page.locator(`a[href*=${itemsStatus}]`).click()
  }

  async toggleAllItems() {
    await this.toggleAllItemsBtn.click()
  }

  async clearAllCompleted() {
    await this.clearCompletedBtn.click()
  }
}

export enum TodoItemsStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
