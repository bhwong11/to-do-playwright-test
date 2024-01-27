// @ts-check
import { test, expect } from '@playwright/test'
import { webkit } from 'playwright'

const testTasks = [{
    title:"test task title 1",
    description: "test task description 1"
  },{
    title:"test task title 2",
    description: "test task description 2"
  },{
    title:"test task title 3",
    description: "test task description 3"
  }
]

const editedTask = {
  title:"test new title",
  description: "test new description"
}

test.describe('Create delete functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002/to-do-list');
  });

  test.afterAll( async()=>{
    console.log('done')
    const browser = await webkit.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3002/to-do-list');
    const firstToDo = page.locator('.to-do').filter({hasText:'test'}).first()
    await firstToDo.waitFor({state: "visible"})
    const allToDos = await page.locator('.to-do',{hasText:'test'}).all()
    console.log('alltodos',allToDos)
    for(let i=0;i<allToDos.length;i++){
      await allToDos[i].getByRole('button').click()
      await allToDos[i].getByText('delete ToDo').click()
    }
  })

  test('page has correct title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/To Dos/);
  });

  test('created task displays', async ({ page }) => {

    const titleInput = page.getByRole('textbox', { name: 'title' })
    const descriptionInput = page.getByRole('textbox', { name: 'description' })
    const createButton = page.getByRole('button', { name: 'finish Add ToDo' })

    await titleInput.fill(testTasks[0].title)
    await descriptionInput.fill(testTasks[0].description)
    await createButton.click()

    const newToDo = page.getByText(testTasks[0].title).first()
    
    await expect(newToDo).toBeVisible();
  });

  test('deleted task disappears', async ({ page }) => {

    const titleInput = page.getByRole('textbox', { name: 'title' })
    const descriptionInput = page.getByRole('textbox', { name: 'description' })
    const createButton = page.getByRole('button', { name: 'finish Add ToDo' })

    await titleInput.fill(testTasks[0].title)
    await descriptionInput.fill(testTasks[0].description)
    await createButton.click()

    const newToDoTitle = page.getByRole('paragraph').filter({hasText:testTasks[0].title})
    const newToDo = page.locator('.to-do', {has: newToDoTitle}).first()
    const newToDoShowEditButton = newToDo.getByRole('button', { name: 'show edit' }).first()
    await newToDoShowEditButton.click()

    await page.getByRole('button', { name: 'delete ToDo' }).click()

    await expect(newToDo).toBeHidden();
  })

  test('edited task appears', async ({ page }) => {
    // Expect a title "to contain" a substring.
    const titleInput = page.getByRole('textbox', { name: 'title' })
    const descriptionInput = page.getByRole('textbox', { name: 'description' })
    const createButton = page.getByRole('button', { name: 'finish Add ToDo' })

    await titleInput.fill(testTasks[0].title)
    await descriptionInput.fill(testTasks[0].description)
    await createButton.click()

    const newToDoTitle = page.getByRole('paragraph').filter({hasText:testTasks[0].title})
    const newToDo = page.locator('.to-do', {has: newToDoTitle}).first()
    const newToDoShowEditButton = newToDo.getByRole('button', { name: 'show edit' }).first()
    await newToDoShowEditButton.click()

    await page.getByRole('button', { name: 'edit ToDo' }).click()

    await titleInput.first().fill(editedTask.title)
    await descriptionInput.first().fill(editedTask.description)
    const editButton = page.getByRole('button', { name: 'finish Edit ToDo' })
    await editButton.click()

    const editedToDoTitle = page.getByRole('paragraph').filter({hasText:editedTask.title})
    const editedToDoDescription = page.getByRole('paragraph').filter({hasText:editedTask.description})
    const editedToDo = page.locator('.to-do', {has: editedToDoTitle}).and(page.locator('.to-do', {has: editedToDoDescription})).first()

    await expect(editedToDo).toBeVisible();
  })

})