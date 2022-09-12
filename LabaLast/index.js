const brain = require('brain.js')
const mnist = require('mnist')

const { show } = require('./utils/index')

const predict = () => {
  const net = new brain.NeuralNetwork()
  const set = mnist.set(0, 1)
  const value = set.test
  net.fromJSON(require('./data/train'))
  const output = net.run(value[0].input)
  const table = [
    {
      E: value[0].output,
      Y: show(output),
    },
  ]
  console.log(table)
}

predict()
