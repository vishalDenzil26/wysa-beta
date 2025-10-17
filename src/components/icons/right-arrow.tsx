import { cn } from '@/utilities/cn'

export const RightArrow: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10.068"
      height="10.068"
      viewBox="0 0 10.068 10.068"
      className={cn(className)}
    >
      <g id="Group_128" transform="translate(777.194 -8389.736) rotate(45)">
        <line
          id="Line_13"
          y1="4.998"
          x2="4.998"
          transform="translate(5387.5 6479.5)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <line
          id="Line_14"
          y1="4.229"
          transform="translate(5392.498 6479.5)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <line
          id="Line_15"
          x2="4.229"
          transform="translate(5388.269 6479.5)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  )
}
