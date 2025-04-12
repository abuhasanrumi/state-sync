import { syncState } from '../src/index'

describe('state-sync', () => {
  let channels: Map<string, MockBroadcastChannel[]>

  // Define MockBroadcastChannel type
  class MockBroadcastChannel {
    name: string
    onmessage: ((ev: MessageEvent) => void) | null = null
    private subscribers: MockBroadcastChannel[]

    constructor(name: string) {
      this.name = name
      if (!channels.has(name)) {
        channels.set(name, [])
      }
      this.subscribers = channels.get(name) || []
      this.subscribers.push(this)
    }

    postMessage(data: any) {
      // Broadcast to all other channels with the same name
      this.subscribers.forEach((channel) => {
        if (channel !== this && channel.onmessage) {
          channel.onmessage(new MessageEvent('message', { data }))
        }
      })
    }

    close() {
      const index = this.subscribers.indexOf(this)
      if (index > -1) {
        this.subscribers.splice(index, 1)
      }
    }
  }

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    channels = new Map()

    Object.defineProperty(window, 'BroadcastChannel', {
      value: MockBroadcastChannel,
      writable: true
    })
  })

  test('syncs state across instances', (done) => {
    const state1 = syncState({ key: 'test', initialState: { count: 0 } })
    const state2 = syncState({ key: 'test', initialState: { count: 0 } })

    // Update state1
    state1.count = 1

    setTimeout(() => {
      expect(state2.count).toBe(1)
      done()
    }, 100)
  }, 6000)

  test('persists state to localStorage', () => {
    const state = syncState({
      key: 'persist',
      initialState: { x: 0 },
      persist: true
    })
    state.x = 42
    expect(localStorage.getItem('persist')).toBe(JSON.stringify({ x: 42 }))
  })

  test('calls onChange callback', (done) => {
    const onChange = jest.fn()
    const state = syncState({
      key: 'change',
      initialState: { value: '' },
      onChange
    })
    state.value = 'test'
    setTimeout(() => {
      expect(onChange).toHaveBeenCalledWith({ value: 'test' })
      done()
    }, 10)
  })
})
