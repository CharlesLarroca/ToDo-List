"use strict";

const $todoList = document.querySelector('#todo__list')
const $inputNewItem = document.querySelector('#input_new-item')

const getDatabase = () => JSON.parse(localStorage.getItem('todoList')) ?? [] //valida se o localStorage está vazio e retorna os dados em forma de objeto

const setDatabase = (database) => localStorage.setItem('todoList', JSON.stringify(database)) //envia os dados em forma de string

const database = getDatabase()

const createItem = (task, status, index) => {
  const item = document.createElement('label')
  item.classList.add('todo__item')
  item.innerHTML = `
    <input type="checkbox" ${status} data-index=${index}>
    <div>${task}</div>
    <input type="button" value="x" data-index=${index}>
  `
  $todoList.appendChild(item)
}

const clearTasks = () => {
  while ($todoList.firstChild) {
    $todoList.removeChild($todoList.lastChild)
  }
}

const updateList = () => {
  clearTasks()
  database.forEach((item, index) => createItem(item.task, item.status, index)) 
}

const addNewTask = (e) => {
  const enterKey = e.key
  if(enterKey === 'Enter') {
    database.push({task:$inputNewItem.value})
    setDatabase(database)
    updateList()
    $inputNewItem.value = ''
  }
}

$inputNewItem.addEventListener('keypress', addNewTask)

const removeItem = (index) => {
  database.splice(index,1)//faz o processo de splice 1x a partir do index passado, assim removendo da database 
  setDatabase(database)
  updateList()
}

const updateStatus = (index) => {
  if(database[index].status !== 'checked'){
    database[index].status = 'checked'
  } else {
    database[index].status = ''
  }
  updateList()
}

const clickItem = (e) => {
  const element = e.target
  console.log(element)
  const index = element.dataset.index //metodo para capturar o elemento pelo index do mesmo, recebido pelo atributo data-nome que demos, no caso index
  if (element.type === 'button') {
    removeItem(index)
  }
  if(element.type === 'checkbox'){
    updateStatus(index)
  }
}

$todoList.addEventListener('click', clickItem)

updateList()