import { ActionTypes } from './actions'

interface IState {
  taskName: string,
  taskDate: string,
  taskStatus: 'unfinished' | 'finished',
  taskKey: number
}

interface IAction {
  type: string,
  payload: any
}

export function tasksReducer(state: IState[], action: IAction) {
  switch(action.type) {

    case ActionTypes.ADD_NEW_TASK:
      return [action.payload.newTaskData, ...state]

    case ActionTypes.UPDATE_EXISTING_TASK:

      const taskListCopy = [...state]

      const taskItemToUpdate = state.filter(item => item.taskKey === action.payload.taskKey)[0]
      const taskItemToUpdateIndex = taskListCopy.indexOf(taskItemToUpdate)
      taskItemToUpdate.taskName = action.payload.taskNewName
      taskItemToUpdate.taskStatus = action.payload.taskNewStatus

      taskListCopy[taskItemToUpdateIndex] = taskItemToUpdate
      return [...taskListCopy]
    
    case ActionTypes.DELETE_EXISTING_TASK:
      return state.filter(item => item.taskKey !== action.payload.taskKey)

    default:
      return state
  }
}
