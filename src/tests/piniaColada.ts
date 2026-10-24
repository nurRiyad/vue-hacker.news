import { PiniaColada } from '@pinia/colada'
import { createPinia } from 'pinia'

export function createPiniaColadaPlugins() {
  return [createPinia(), PiniaColada]
}
