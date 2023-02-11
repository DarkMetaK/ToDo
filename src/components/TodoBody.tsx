import { FormEvent, useContext, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { taskListContext } from '../context/taskList'
import { convertDateToString } from '../utils/convertDateToString'

import { Button } from './Button'
import { DialogPortal } from './DialogPortal'
import { TaskItem } from './TaskItem'

export function TodoBody() {

  const { tasksList, findTaskByKey } = useContext(taskListContext)
  const [tasksListFiltered, setTasksListFiltered] = useState([...tasksList])

  const [filterSelected, setFilterSelected] = useState('all');
  function handleFilterOfTasks(event: FormEvent) {
    const selectElement = event.target as HTMLSelectElement
    setFilterSelected(selectElement.value)
  }

  useEffect(() => {
    switch(filterSelected) {
      case 'finished':
        setTasksListFiltered(tasksList.filter(item => item.taskStatus === 'finished'))
        break
      case 'unfinished':
        setTasksListFiltered(tasksList.filter(item => item.taskStatus === 'unfinished'))
        break
      default:
        setTasksListFiltered(tasksList)
    }
  }, [filterSelected, [...tasksList]])

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <main className='h-full flex flex-col justify-center items-center gap-4 max-w-2xl w-full mx-auto' >
      <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100'>TODO LIST</h1>

      <div className='flex justify-between w-full'>
        <Dialog.Root open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
          <Dialog.Trigger asChild>
            <Button text='Adicionar'/>
          </Dialog.Trigger>
          <DialogPortal setDialogIsOpen={setDialogIsOpen}/>
        </Dialog.Root>

        <select
          name="filterSelected"
          className='bg-gray-200 rounded-md px-4 py-2 dark:bg-gray-400'
          value={filterSelected}
          onChange={handleFilterOfTasks}
        >
          <option value="all">Todas</option>
          <option value="finished">Completas</option>
          <option value="unfinished">Incompletas</option>
        </select>
      </div>

      <div className='bg-gray-300 rounded-md p-4 w-full shadow-sm shadow-gray-400 dark:bg-gray-200 dark:shadow-gray-600'>
        <ul className='flex flex-col gap-3'>
          {tasksListFiltered.map(item => {
            return (
              <TaskItem
                key={item.taskKey}
                taskName={item.taskName}
                taskDate={convertDateToString(item.taskDate)}
                taskKey={item.taskKey}
                taskIsFinished={
                  findTaskByKey(item.taskKey)?.taskStatus === "finished"
                }
              />                
            )
          })}
        </ul>
      </div>

      <p className='mt-auto text-gray-500 font-bold'>Desenvolvido por Matheus Porto</p>
    </main>
  )
}