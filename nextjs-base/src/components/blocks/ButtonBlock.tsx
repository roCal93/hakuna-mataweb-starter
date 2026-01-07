import React from 'react'
import { Button as ButtonData } from '@/types/strapi'
import { Button } from '@/components/ui/Button'
import { cleanImageUrl } from '@/lib/strapi'

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
      {buttons.map((button, index) => {
        // If file is present, use it; otherwise use URL
        const href = button.file?.url 
          ? cleanImageUrl(button.file.url) || button.url 
          : button.url
        
        // For file downloads, add download attribute
        const isFileDownload = !!button.file?.url
        
        return (
          <Button
            key={index}
            href={href}
            variant={button.variant as 'primary' | 'secondary' | 'outline' | 'ghost'}
            target={button.isExternal || isFileDownload ? '_blank' : undefined}
            rel={isFileDownload ? 'noopener noreferrer' : undefined}
          >
            {button.label}
          </Button>
        )
      })}
    </div>
  )
}
