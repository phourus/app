export function ready(ready) {
  return {type: 'TUTORIAL_READY', ready}
}

export function reset() {
  return {type: 'TUTORIAL_RESET'}
}
