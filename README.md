# cycle-blessed-fun
Example Cycle.js app with blessed for Mulder

# setup & usaage
- Run `npm install`
- Set up `env.js` in root folder, both commands should just return a number
```javascript
module.exports = {
  cpu: `sensors | grep 'Package id 0:' | cut -c17-18`,
  gpu: `nvidia-smi -q -d temperature | grep 'GPU Current Temp' | cut -c39-40`
}
```
- Run `npm run build` to compile
- Run `npm start` to watch dank graph
