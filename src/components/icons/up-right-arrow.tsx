import { cn } from '@/utilities/cn'
import React from 'react'

export const UpRightArrow: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path d="M5.53442 10.5333L10.5324 5.53534" stroke="currentColor" />
      <path d="M10.5325 9.76434V5.53534" stroke="currentColor" />
      <path d="M6.30347 5.53534H10.5325" stroke="currentColor" />
    </svg>
  )
}
