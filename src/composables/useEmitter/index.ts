import { inject } from 'vue'
import { Emitter, EventType } from 'mitt'

export const useEmitter = <
  T extends Record<EventType, unknown>
>(): Emitter<T> => {
  return inject('emitter')!
}
