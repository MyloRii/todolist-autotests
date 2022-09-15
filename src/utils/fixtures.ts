import { test as base } from '@playwright/test'
import { TodoListPage } from '../page-objects/todo-list.page'

export type Pages = {
  todoListPage: TodoListPage
}

type MyFixtures = {
  pages: Pages
}

export const test = base.extend<MyFixtures>({
  pages: async ({ page }, use) => {
    await use({
      todoListPage: new TodoListPage(page),
    })
  },
})

export { expect } from '@playwright/test'
