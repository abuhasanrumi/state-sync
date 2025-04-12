export const syncState = <T extends object>({
  key,
  initialState: i,
  persist: p = false,
  onChange: c
}: {
  key: string
  initialState: T
  persist?: boolean
  onChange?: (state: T) => void
}): T => {
  if (i == null) throw Error('initialState must be object/array')

  const u = (d: T) => {
    if (Array.isArray(s)) {
      s.length = 0
      ;(s as any[]).push(...(d as any[]))
    } else {
      Object.assign(s, d)
    }
    if (p) localStorage[key] = JSON.stringify(s)
    c?.(s)
  }

  let s: T = Array.isArray(i) ? ([...i] as T) : ({ ...i } as T)
  if (p && localStorage[key]) {
    const d = JSON.parse(localStorage[key] || '{}')
    if (Array.isArray(i) === Array.isArray(d)) s = d
  }

  const y = globalThis.BroadcastChannel
    ? ((k, m) => {
        if (!BroadcastChannel) return { send: () => {}, close: () => {} }
        const c = new BroadcastChannel(k)
        c.onmessage = (e) => m(e.data)
        return { send: (d: any) => c.postMessage(d), close: () => c.close() }
      })(key, u)
    : ((k, m) => {
        addEventListener('storage', (e) =>
          e.key === k && e.newValue ? m(JSON.parse(e.newValue)) : 0
        )
        return {
          send: (d: any) => localStorage.setItem(k, JSON.stringify(d)),
          close: () => {}
        }
      })(key, u)

  return new Proxy(s, {
    set: (t, p, v) => {
      t[p as keyof T] = v
      y.send(t)
      u(t)
      return true
    }
  })
}