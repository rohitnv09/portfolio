import type { JSX } from 'solid-js'
import { iconPaths, type IconName } from './iconPaths'

type IconProps = {
  name: IconName
  class?: string
  style?: JSX.CSSProperties
  title?: string
  size?: number
}

export default function Icon(props: IconProps) {
  const size = props.size ?? 24

  return (
    <svg
      aria-hidden={props.title ? undefined : 'true'}
      class={props.class}
      fill="none"
      role={props.title ? 'img' : undefined}
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      height={`${size}px`}
      style={props.style}
      width={`${size}px`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.title ? <title>{props.title}</title> : null}
      {iconPaths[props.name].map(path => <path d={path} />)}
    </svg>
  )
}
