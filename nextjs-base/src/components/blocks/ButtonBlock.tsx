import React from 'react'
import { Button as ButtonData } from '@/types/strapi'
import { Button } from '@/components/ui/Button'

type ButtonBlockProps = {
  buttons: ButtonData[]
  alignment: 'left' | 'center' | 'right' | 'space-between'
}

export const ButtonBlock = ({ buttons, alignment }: ButtonBlockProps) => {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    'space-between': 'justify-between',
  }

  return (
    <div className={`flex flex-wrap gap-4 my-6 ${alignmentClasses[alignment]}`}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          href={button.url}
          variant={button.variant as 'primary' | 'secondary' | 'outline' | 'ghost'}
          target={button.isExternal ? '_blank' : undefined}
        >
          {button.label}
        </Button>
      ))}
    </div>
  )
}
