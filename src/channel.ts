import { SyncHandler } from './types'

export const createChannelSync = (
  key: string,
  onMessage: (data: any) => void
): SyncHandler => {
  if (!globalThis.BroadcastChannel) return { send: () => {}, close: () => {} }
  const c = new BroadcastChannel(key)
  c.onmessage = (e) => onMessage(e.data)
  return { send: (d) => c.postMessage(d), close: () => c.close() }
}
