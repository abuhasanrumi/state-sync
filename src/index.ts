import { createChannelSync } from './channel'
import { createStorageSync } from './storage'

export const syncState = <T>({
  key,
  initialState,
  persist = false,
  onChange
}: {
  key: string
  initialState: T
  persist?: boolean
  onChange?: (state: T) => void
}): T => {
  const handleChange = (data: any) => {
    Object.assign(state, data)
    if (persist) {
      localStorage[key] = JSON.stringify(state)
    }
    onChange?.(state)
  }

  const state = Object.assign(
    {},
    persist
      ? JSON.parse(localStorage[key] || JSON.stringify(initialState))
      : initialState
  )

  const sync =
    typeof BroadcastChannel !== 'undefined'
      ? createChannelSync(key, handleChange)
      : createStorageSync(key, handleChange)

  return new Proxy(state, {
    set: (target, prop, value) => {
      target[prop as keyof T] = value
      sync.send(target)
      handleChange(target)
      return true
    }
  }) as T
}
