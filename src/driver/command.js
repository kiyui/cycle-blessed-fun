import xs from 'xstream'
import { exec } from 'child_process'

export function commandDriver (sink$) {
  const source$ = xs.create()

  sink$.addListener({
    next: function onReceiveCommand ({ category, command }) {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          throw new Error(`Command driver experienced an error while executing a command`)
        }

        source$.shamefullySendNext({ category, stdout, stderr })
      })
    }
  })

  return source$
}
