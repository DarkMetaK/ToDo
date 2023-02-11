import { FormEvent, useContext, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';

import { Button } from './Button';
import { taskListContext } from '../context/taskList';

interface IDialogPortal {
  title?: string,
  buttonText?: string,
  nameInputValue?: string,
  statusSelectValue?: 'finished' | 'unfinished',
  taskKey?: number,
  setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DialogPortal({
  title='Adicionar Tarefa',
  buttonText='Adicionar',
  nameInputValue='',
  statusSelectValue='unfinished',
  taskKey,
  setDialogIsOpen
}: IDialogPortal) {
  const { createNewTask, updateTask } = useContext(taskListContext)

  const [inputTaskName, setInputTaskName] = useState(nameInputValue)

  function handleInputTaskNameChange(event: any) {
    setInputTaskName(event.target.value)
  }

  function handleSubmit(event:FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const { taskName, taskStatus } = Object.fromEntries(formData)
    
    if (title === 'Adicionar Tarefa') {
      createNewTask({
      taskName: inputTaskName,
      taskStatus: taskStatus as 'finished' | 'unfinished',
      taskDate: new Date().toISOString(),
      taskKey: new Date().getTime()
      })
    }
    else if (title === 'Atualizar Tarefa') {
      updateTask({
        taskNewName: taskName as string,
        taskNewStatus: taskStatus as 'finished' | 'unfinished',
        taskKey: taskKey as number
      })
    }

    setDialogIsOpen(false)
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-gray-900 bg-opacity-70'/>

      <Dialog.Content
        className='bg-gray-200 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md p-6'
      >

        <Dialog.Title className='text-xl font-medium text-gray-700 mb-6'>
          {title}
        </Dialog.Title>

        <form className='flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor="taskName" className='text-gray-600 font-medium'>Nome</label>
          <input
            type="text"
            name='taskName'
            className='p-2 rounded-md mb-3'
            value={inputTaskName}
            onChange={handleInputTaskNameChange}
          />
          <label htmlFor="taskStatus" className='text-gray-600 font-medium'>Status</label>
          <select
            name='taskStatus'
            id='taskStatus'
            defaultValue={statusSelectValue}
            className='p-2 rounded-md mb-6'
          >
            <option value="unfinished">Incompleta</option>
            <option value="finished">Completa</option>
          </select>
          <div className='flex gap-3'>
            <Button text={buttonText} disabled={!inputTaskName}/>
            <Dialog.Close asChild>
              <Button text='Cancelar' variant='secondary' type='button'/>   
            </Dialog.Close>         
          </div>
        </form>
        <Dialog.Close
          className='rounded-md h-6 w-6 absolute top-[10px] right-[10px] flex items-center justify-center hover:text-gray-400 transition-colors'
        >
          <X />
        </Dialog.Close>

      </Dialog.Content>
    </Dialog.Portal>    
  )
}