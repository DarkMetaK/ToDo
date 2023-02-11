interface ITask {
  taskName: string,
  taskDate: string,
  taskStatus: 'unfinished' | 'finished',
  taskKey: number
}

export function createLocalStorage(tasksData: ITask[]) {
  localStorage.setItem('darkMetaK-Todo', JSON.stringify(tasksData))
}

export function readLocalStorage(): ITask[] | [] {
  const localStorageData = localStorage.getItem('darkMetaK-Todo')
  if (localStorageData) {
    return JSON.parse(localStorageData)
  }
  else return []
}