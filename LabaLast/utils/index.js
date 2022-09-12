const show = (output) => {
  const maximum = output.reduce(function (p, c) {
    return p > c ? p : c
  })
  const nominators = output.map(function (e) {
    return Math.exp(e - maximum)
  })
  const denominator = nominators.reduce(function (p, c) {
    return p + c
  })
  const softmax = nominators.map(function (e) {
    return e / denominator
  })

  let maxIndex = 0
  softmax.reduce(function (p, c, i) {
    if (p < c) {
      maxIndex = i
      return c
    } else return p
  })
  const result = []
  for (let i = 0; i < output.length; i++) {
    if (i == maxIndex) result.push(1)
    else result.push(0)
  }
  return result
}

module.exports = {
  show,
}
