import { useContext, useState } from "react"
import * as Dialog from '@radix-ui/react-dialog'
import { Trash, Pencil } from "phosphor-react"

import { CheckBox } from "./Checkbox"
import { DialogPortal } from "./DialogPortal";
import { taskListContext } from "../context/taskList";

interface ITaskItem {
  taskName: string,
  taskDate: string,
  taskKey: number,
  taskIsFinished: boolean,
}

export function TaskItem({taskName, taskDate, taskKey, taskIsFinished}: ITaskItem) {
  const { deleteTask, updateTask } = useContext(taskListContext)

  function handleTaskBeingChecked() {
    const status = taskIsFinished ? 'unfinished' : 'finished'
    updateTask({taskKey: taskKey, taskNewName: taskName, taskNewStatus: status})
  }

  function handleDeleteTask() {
    deleteTask(taskKey)
  }

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <li className='flex justify-between bg-gray-100 py-2 px-4 rounded-md'>

      <div className='flex items-center gap-3'>
        <CheckBox checked={taskIsFinished} onClick={handleTaskBeingChecked}/>
        <div>
          <p 
            className={`text-gray-900 font-medium ${taskIsFinished && 'line-through'}`}
          >
            {taskName}
          </p>
          <span className='text-xs text-gray-500'>{taskDate}</span>
        </div>              
      </div>
            
      <div className='flex gap-3'>
        <button 
          className='bg-gray-300 self-center p-2 rounded-md flex justify-center items-center hover:bg-gray-400 transition-colors dark:bg-gray-200 dark:hover:bg-gray-300'
        >
          <Trash className='leading-none text-gray-900' onClick={handleDeleteTask}/>
        </button>

        <Dialog.Root open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
          <Dialog.Trigger asChild>
            <button
              className='bg-gray-300 self-center p-2 rounded-md flex justify-center items-center hover:bg-gray-400 transition-colors dark:bg-gray-200 dark:hover:bg-gray-300'
            >
              <Pencil className='leading-none text-gray-900'/>
            </button> 
          </Dialog.Trigger>
          <DialogPortal
            title="Atualizar Tarefa"
            buttonText="Atualizar"
            nameInputValue={taskName}
            statusSelectValue={taskIsFinished ? 'finished' : 'unfinished'}
            taskKey={taskKey}
            setDialogIsOpen={setDialogIsOpen}
          />
        </Dialog.Root>
      </div>
    </li>
  )
}
