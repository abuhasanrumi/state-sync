import { SyncHandler } from './types'

export const createStorageSync = (
  key: string,
  onMessage: (data: any) => void
): SyncHandler => {
  addEventListener(
    'storage',
    (e) => e.key === key && e.newValue && onMessage(JSON.parse(e.newValue))
  )
  return {
    send: (d) => localStorage.setItem(key, JSON.stringify(d)),
    close: () => {}
  }
}
