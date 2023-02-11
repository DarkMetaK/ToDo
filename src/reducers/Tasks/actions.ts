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

export enum ActionTypes {
  ADD_NEW_TASK = 'ADD_NEW_TASK',
  UPDATE_EXISTING_TASK = 'UPDATE_EXISTING_TASK',
  DELETE_EXISTING_TASK = 'DELETE_EXISTING_TASK',
}

export function createNewTaskAction(newTaskData: ITask) {
  return {
    type: ActionTypes.ADD_NEW_TASK,
    payload: {
      newTaskData
    }
  }
}

export function updateTaskAction({taskKey, taskNewName, taskNewStatus}: ITaskToUpdate) {
  return {
    type: ActionTypes.UPDATE_EXISTING_TASK,
    payload: {
      taskKey,
      taskNewName,
      taskNewStatus
    }
  }
}

export function deleteTaskAction(taskKey: number) {
  return {
    type: ActionTypes.DELETE_EXISTING_TASK,
    payload: {
      taskKey
    }
  }
}
