import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

export function CheckBox({...rest}: Checkbox.CheckboxProps) {
  return (
    <Checkbox.Root className='bg-gray-200 w-7 h-7 rounded-md flex justify-center items-center hover:bg-gray-300' {...rest}>
      <Checkbox.Indicator className="CheckboxIndicator">
        <Check weight='bold'/>
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}