import { faker } from '@faker-js/faker'
import { TodoItemsStatus } from '../page-objects/todo-list.page'
import { expect, test } from '../utils/fixtures'

test.describe('[@Todolist] Todo-list todo item(s)', () => {
  test.describe.configure({ mode: 'parallel' })

  test.beforeEach(async ({ pages }) => {
    await pages.todoListPage.page.goto(process.env.BASE_URL as string)
  })

  test('verify todo-list components', async ({ pages }) => {
    const expectedTodolistName = 'todos'

    expect(await pages.todoListPage.getTodolistName()).toBe(expectedTodolistName)
    expect(await pages.todoListPage.todoInput.isEditable()).toBeTruthy()
  })

  test('can be added', async ({ pages }) => {
    const testTodo = faker.random.word()

    await pages.todoListPage.addTodo(testTodo)
    expect(await pages.todoListPage.getTodosList()).toContain(testTodo)
  })

  test('multiple items can be added', async ({ pages }) => {
    const firstTodo = faker.random.word()
    const secondTodo = faker.random.word()

    await pages.todoListPage.addTodo(firstTodo)
    await pages.todoListPage.addTodo(secondTodo)
    expect(await pages.todoListPage.getTodosList()).toContain(firstTodo)
    expect(await pages.todoListPage.getTodosList()).toContain(secondTodo)
  })

  test('can be deleted', async ({ pages }) => {
    const testTodo = faker.random.word()

    await pages.todoListPage.addTodo(testTodo)
    await pages.todoListPage.deleteTodo(testTodo)
    expect(await pages.todoListPage.getTodosList()).toStrictEqual([])
  })

  test('status is changing(all, active, completed)', async ({ pages }) => {
    const testTodo = faker.random.word()

    await pages.todoListPage.addTodo(testTodo)
    await pages.todoListPage.completeTodo(testTodo)

    await pages.todoListPage.openTodoItems(TodoItemsStatus.ACTIVE)
    expect((await pages.todoListPage.getTodosList()).length).toBe(0)

    await pages.todoListPage.openTodoItems(TodoItemsStatus.COMPLETED)
    expect((await pages.todoListPage.getTodosList()).length).toBe(1)

    await pages.todoListPage.openTodoItems(TodoItemsStatus.ALL)
    expect((await pages.todoListPage.getTodosList()).length).toBe(1)
  })

  test('items left counter is changing', async ({ pages }) => {
    const firstTodo = faker.random.word()
    const secondTodo = faker.random.word()

    await pages.todoListPage.addTodo(firstTodo)
    expect(await pages.todoListPage.getItemsLeftCount()).toBe('1')

    await pages.todoListPage.addTodo(secondTodo)
    expect(await pages.todoListPage.getItemsLeftCount()).toBe('2')

    await pages.todoListPage.completeTodo(firstTodo)
    expect(await pages.todoListPage.getItemsLeftCount()).toBe('1')

    await pages.todoListPage.completeTodo(secondTodo)
    expect(await pages.todoListPage.getItemsLeftCount()).toBe('0')
  })

  test('mark all items completed and then uncompleted', async ({ pages }) => {
    const firstTodo = faker.random.word()
    const secondTodo = faker.random.word()

    await pages.todoListPage.addTodo(firstTodo)
    await pages.todoListPage.addTodo(secondTodo)
    expect(await pages.todoListPage.getItemsLeftCount()).toBe('2')

    await pages.todoListPage.toggleAllItems()
    expect(await pages.todoListPage.getItemsLeftCount()).toBe('0')

    await pages.todoListPage.toggleAllItems()
    expect(await pages.todoListPage.getItemsLeftCount()).toBe('2')
  })

  test('clear all completed items', async ({ pages }) => {
    const firstTodo = faker.random.word()
    const secondTodo = faker.random.word()

    await pages.todoListPage.addTodo(firstTodo)
    await pages.todoListPage.addTodo(secondTodo)

    await pages.todoListPage.toggleAllItems()
    await pages.todoListPage.clearAllCompleted()
    expect((await pages.todoListPage.getTodosList()).length).toBe(0)
  })
})
