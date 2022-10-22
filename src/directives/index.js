import { setupMakePhoneCallDirective } from './makePhoneCall'
import { setupSrcDirective } from './src'

export function setupGlobDirectives(app) {
  setupMakePhoneCallDirective(app)
  setupSrcDirective(app)
}
