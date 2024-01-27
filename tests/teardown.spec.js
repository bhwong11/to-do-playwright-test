// @ts-check
import { test } from '@playwright/test'

test('clean up', async({page})=>{
  console.log('done')
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