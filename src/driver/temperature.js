import blessed from 'blessed'
import contrib from 'blessed-contrib'

export function temperatureDriver (sink$) {
  const screen = blessed.screen({
    smartCSR: true
  })

  const line = contrib.line({
    style: {
      line: 'yellow',
      text: 'white',
      baseline: 'black'
    },
    label: 'Temperatures'
  })

  const x = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]

  // Add line to screen
  screen.append(line)

  sink$.addListener({
    next: function updateGraph ({ cpu, gpu }) {
      const cpuSeries = {
        title: 'cpu',
        style: {
          line: 'blue'
        },
        x,
        y: cpu
      }

      const gpuSeries = {
        title: 'gpu',
        style: {
          line: 'green'
        },
        x,
        y: gpu
      }

      line.setData([ cpuSeries, gpuSeries ])
      screen.render()
    }
  })
}
