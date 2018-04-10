import './polyfill.js'
import * as monaco from './vs/editor/editor.api.js'
import './vs/editor/editor.main.js'

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'typescript' || label === 'javascript')
      return `/vs/language/typescript/ts.worker.js`;
    if (['json', 'css', 'html', 'typescript'].includes(label))
      return `/vs/language/${label}/${label}.worker.js`;
    return `/vs/editor/editor.worker.js`;
  }
}
