// @ts-check
import { test, expect } from '@playwright/test'

const testTasks = [{
    title:"test task title 1",
    description: "test task description 1"
  },{
    title:"test task title 2",
    description: "test task description 2"
  },{
    title:"test task title 3",
    description: "test task description 3"
  }]

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3002/to-do-list');
});

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

  const newToDo = page.getByText(testTasks[0].title)
  
  await expect(newToDo).toBeVisible();
});

test('deleted task displays', async ({ page }) => {
  // Expect a title "to contain" a substring.
  const titleInput = page.getByRole('textbox', { name: 'title' })
  const descriptionInput = page.getByRole('textbox', { name: 'description' })
  const createButton = page.getByRole('button', { name: 'finish Add ToDo' })

  await titleInput.fill(testTasks[1].title)
  await descriptionInput.fill(testTasks[1].description)
  await createButton.click()

  const newToDoTitle = page.getByRole('paragraph').filter({hasText:testTasks[1].title})
  const newToDo = page.locator('.to-do', {has: newToDoTitle}).first()
  const newToDoShowEditButton = newToDo.getByRole('button', { name: 'show edit' }).first()
  await newToDoShowEditButton.click()

  await page.getByRole('button', { name: 'delete ToDo' }).click()

  await expect(newToDo).toBeVisible();
});