import { setupMakePhoneCallDirective } from './makePhoneCall'
import { setupOpenLocationDirective } from './openLocation'
import { setupSrcDirective } from './src'

export function setupGlobDirectives(app) {
  setupMakePhoneCallDirective(app)
  setupOpenLocationDirective(app)
  setupSrcDirective(app)
}
