import { run } from '@cycle/run'
import { commandDriver } from './driver/command'
import { temperatureDriver } from './driver/temperature'
import env from '../env'
import App from './app'

const drivers = {
  command: commandDriver,
  temperature: temperatureDriver
}

run(App(env), drivers)
