import { useState } from 'react'
import { Moon, Sun } from 'phosphor-react'

import { TaskListContextProvider } from './context/taskList'
import { TodoBody } from './components/TodoBody'
import { setDarkMode } from './utils/setDarkMode'

import './styles/main.css'

export function App() {

  const [isDarkModeActive, setIsDarkModeActive] = useState(false)

  function handleDarkModeButton() {
    setIsDarkModeActive(!isDarkModeActive)
    setDarkMode()
  }

  return (
    <TaskListContextProvider>
      <button
        className='block ml-auto mb-3'
        onClick={handleDarkModeButton}
      >
        {isDarkModeActive? 
          <Sun size={32} className='text-gray-400'/>
        :
          <Moon size={32} className='text-gray-400'/>
        }
      </button>
      <TodoBody />
    </TaskListContextProvider>
  )
}
