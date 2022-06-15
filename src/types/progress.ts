import type { RouteMeta } from 'vue-router'

export type IProgressBaseMetaOption = {
  call: string
  modifier: string
  argument: string
}

export interface IProgressTransition
  extends Omit<IProgressBaseMetaOption, 'argument'> {
  argument: {
    speed: string
    opacity: string
    termination: number
  }
}

export type IProgressMeta = {
  color?: IProgressBaseMetaOption
  fail?: IProgressBaseMetaOption
  location?: IProgressBaseMetaOption
  transition?: IProgressTransition
}

declare module 'vue-router' {
  interface RouteMeta {
    progress?: IProgressMeta
  }
}

export type Progress = {
  start(): void
  finish(): void
  fail(): void
  increase(number: number): void
  decrease(number: number): void
  set(number: number): void
  setFailColor(color: string): void
  setColor(color: string): void
  setLocation(location: string): void
  setTransition(transition: { [key: string]: any }): void
  tempFailColor(color: string): void
  tempColor(color: string): void
  tempLocation(location: string): void
  tempTransition(transition: { [key: string]: any }): void
  revertColor(): void
  revertFailColor(): void
  revertTransition(): void
  revert(): void
  parseMeta(meta: RouteMeta): void
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $Progress: Progress
  }
}

export default {}
