import React, { LegacyRef } from "react";
import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
  text: string
  variant?: 'primary' | 'secondary'
}

export const Button = React.forwardRef(({text, variant='primary', ...rest}:IButton, ref: LegacyRef<HTMLButtonElement> | undefined) => {
  return (
    <button
      ref={ref}
      {...rest}
      className={`px-4 py-2 font-bold rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed
      ${variant === 'primary' && 'bg-yellow-400 text-yellow-900 enabled:hover:bg-yellow-500'} 
      ${variant === 'secondary' && 'bg-gray-300 text-gray-600 enabled:hover:bg-gray-400'}`}
    >
      {text}
    </button>
  )
  }
)