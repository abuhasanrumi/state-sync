A tiny (~1KB) JavaScript utility to sync state across browser tabs and windows using `BroadcastChannel` with a `localStorage` fallback. Perfect for SPAs, PWAs, and collaborative apps needing seamless, real-time updates.

## Installation

```bash
npm install @abuhasanrumi/state-sync
```

## Live Demo

Check it out:

[Live Demo on CodeSandbox](https://codesandbox.io/p/sandbox/state-sync-demo-abc123)

Open the demo in multiple tabs to see a todo list sync instantly!

## Usage

Create a reactive state that syncs across tabs:

```javascript
import { syncState } from '@abuhasanrumi/state-sync'

const state = syncState({
  key: 'counter',
  initialState: { count: 0 },
  persist: true,
  onChange: (state) => console.log('State:', state)
})

state.count += 1 // Updates all open tabs
```

### Options

- `key` (string): Unique identifier for the state.
- `initialState` (object/array): Initial state to sync.
- `persist` (boolean, optional): Save state to `localStorage` (default: `false`).
- `onChange` (function, optional): Callback triggered on state changes.

### Example: Todo List

Build a synced todo list:

```javascript
import { syncState } from '@abuhasanrumi/state-sync'

const todos = syncState({
  key: 'todos',
  initialState: [],
  persist: true,
  onChange: (state) => {
    document.getElementById('list').innerHTML = state
      .map((todo) => `<li>${todo}</li>`)
      .join('')
  }
})

document.getElementById('add').onclick = () => {
  const input = document.getElementById('input')
  if (input.value.trim()) {
    todos.push(input.value.trim())
    input.value = ''
  }
}

// Initial render
document.getElementById('list').innerHTML = todos
  .map((todo) => `<li>${todo}</li>`)
  .join('')
```

## Notes

- `initialState` must be an object or array. For primitives (numbers, strings), wrap them:
  ```javascript
  const count = syncState({ key: 'count', initialState: { value: 0 } })
  count.value += 1
  ```
- Nested updates require replacing properties:
  ```javascript
  state.nested = { ...state.nested, prop: value }
  ```
- Persisted state must match `initialState` type, or clear `localStorage[key]`.

## Error Handling

- Throws `Error('initialState must be object/array')` if `initialState` is `null`, `undefined`, or a primitive.
- Warns in console if persisted state fails to parse.

## Why I Built This

I wanted to tackle a common web dev challenge: keeping state consistent across browser tabs. Whether it’s a shared shopping cart, a live form, or a collaborative tool, users expect tabs to stay in sync without lag or complexity. I created `state-sync` to deliver that experience in a lightweight ~1KB package, using browser-native APIs to keep it fast and dependency-free.

## Why It’s Different Than Others

Unlike heavy state management libraries like Redux or Zustand, or sync solutions like y-js and localforage, `state-sync` is hyper-focused on cross-tab synchronization. At just ~1KB, it’s a fraction of the size of alternatives, leveraging `BroadcastChannel` for instant updates and `localStorage` for broader compatibility. It’s not a full store—just a minimal, reactive utility with TypeScript support, designed to slot into any project without bloat.

## Why I Came Up With This Idea

While working on single-page apps, I noticed how often tabs fall out of sync—think adding a todo in one tab but not seeing it in another. Browser APIs like `BroadcastChannel` offered a solution, but I couldn’t find a simple, tiny library to harness them. After prototyping a todo list that synced across tabs, I was hooked on the idea of making tab-syncing effortless. That spark led to `state-sync`, a micro-tool to bring that magic to every developer.

## Features

- **Lightweight**: ~1KB, smaller than most scripts.
- **Real-Time**: `BroadcastChannel` for instant sync, `localStorage` fallback for compatibility.
- **Reactive**: Proxy-based state updates.
- **Persistent**: Optional `localStorage` to retain state.
- **TypeScript-Ready**: Full type definitions.
- **Zero Dependencies**: Pure JavaScript, built for browsers.

## Development

Get started:

```bash
git clone https://github.com/abuhasanrumi/state-sync.git
cd state-sync
npm install
npm test
npm run build
```

## Contributing

Have ideas to make `state-sync` even better? Please:

1. Fork the repo.
2. Create a branch: `git checkout -b feature/cool-idea`.
3. Commit changes: `git commit -m 'Add cool idea'`.
4. Push: `git push origin feature/cool-idea`.
5. Open a Pull Request.

## License

MIT © [Abu Hasan Rumi](https://github.com/abuhasanrumi)

## Related

Check out my other micro-utility:

- [@abuhasanrumi/micro-flow](https://www.npmjs.com/package/@abuhasanrumi/micro-flow): Tiny debounce, throttle, and rate-limiting (~364B).

```

```
