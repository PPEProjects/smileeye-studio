import { DeepNonNullable, DeepRequired } from 'ts-essentials'
import { computed, ComputedRef, Ref } from 'vue'

export default function usePick<TResult, TDefaultValue, TReturnValue>(
  result: Ref<TResult>,
  defaultValue: TDefaultValue | undefined,
  pick: (data: DeepRequired<DeepNonNullable<TResult>>) => TReturnValue
): ComputedRef<
  TReturnValue | TResult[keyof TResult] | TResult | TDefaultValue | undefined
> {
  return computed(() => {
    const value = result.value
    if (value) {
      if (pick) {
        try {
          return pick(value as DeepRequired<DeepNonNullable<TResult>>)
        } catch (e) {
          // Silent error
        }
      } else {
        const keys = Object.keys(value)
        if (keys.length === 1) {
          // Automatically take the only key in result data
          return value[keys[0] as keyof TResult]
        } else {
          // Return entire result data
          return value
        }
      }
    }
    return defaultValue
  })
}
