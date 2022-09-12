const brain = require('brain.js')
const net = new brain.NeuralNetwork({
  hiddenLayers: [10, 10],
  inputSize: 784,
  outputSize: 10,
})
const fs = require('fs')
const mnist = require('mnist')

const train = () => {
  const set = mnist.set(1000, 0)
  const trainingSet = set.training
  net.train(trainingSet, {
    errorThresh: 0.005,
    iterations: 20000,
    log: true,
    logPeriod: 1,
    learningRate: 0.01,
    activation: 'leaky-relu',
  })

  let files = fs.createWriteStream('./data/train.json')
  files.write(JSON.stringify(net.toJSON(), null, 4))
  files.end()

  console.log('Got training images')
}

train()
