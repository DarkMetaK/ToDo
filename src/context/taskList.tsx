import { createContext, ReactNode, useEffect, useReducer } from "react";
import { createNewTaskAction, deleteTaskAction, updateTaskAction } from "../reducers/Tasks/actions";
import { tasksReducer } from "../reducers/Tasks/reducer";
import { createLocalStorage, readLocalStorage } from "../utils/localStorage";

interface ITask {
  taskName: string,
  taskDate: string,
  taskStatus: 'unfinished' | 'finished',
  taskKey: number
}

interface ITaskToUpdate {
  taskKey: number,
  taskNewName: string,
  taskNewStatus: 'unfinished' | 'finished'
}

interface ITaskListContext {
  tasksList: ITask[],
  createNewTask: (newTask: ITask) => void,
  updateTask: (taskData: ITaskToUpdate) => void,
  deleteTask: (taskKey: number) => void,
  findTaskByKey: (taskKey: number) => ITask
}

interface ITaskListContextProvider {
  children: ReactNode
}

export const taskListContext = createContext({} as ITaskListContext)

export function TaskListContextProvider({children}: ITaskListContextProvider) {

  const [tasksList, dispatch] = useReducer(
    tasksReducer,
    [],
    () => {
      return readLocalStorage()
    })

  useEffect(() => {
    createLocalStorage(tasksList)
  }, [tasksList])

  function createNewTask(newTask: ITask) {
    dispatch(createNewTaskAction(newTask))
  }

  function updateTask({taskKey, taskNewName, taskNewStatus}: ITaskToUpdate) {
    dispatch(updateTaskAction({taskKey, taskNewName, taskNewStatus}))
  }

  function deleteTask(taskKey: number) {
    dispatch(deleteTaskAction(taskKey))
  }

  function findTaskByKey(taskKey: number) {
    return tasksList.filter(item => item.taskKey === taskKey)[0]
  }

  return (
    <taskListContext.Provider value={
      {
        tasksList,
        createNewTask,
        updateTask,
        deleteTask,
        findTaskByKey
      }}>
      {children}
    </taskListContext.Provider>
  )
}