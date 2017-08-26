import xs from 'xstream'

export default function App ({ cpu, gpu }) {
  return function ({ command }) {
    const timer$ = xs.periodic(1000)

    const requestCpu$ = timer$
      .mapTo({
        category: 'cpu',
        command: cpu
      })

    const requestGpu$ = timer$
      .mapTo({
        category: 'gpu',
        command: gpu
      })

    const temperature$ = command
      .map(({ category, stdout }) => function updateState (state) {
        return {
          ...state,
          [category]: [ ...state[category], parseInt(stdout) ].slice(-8)
        }
      })
      .fold((state, reducer) => reducer(state), { cpu: Array(8).fill(0), gpu: Array(8).fill(0) })

    return {
      command: xs.merge(requestCpu$, requestGpu$),
      temperature: temperature$
    }
  }
}
