//Вариант 9

class RandWeightTHight {
  w = [[]]
  wHide = [[]]
  T = []
  Thide
  countOfStart
  countOfStartHide
  constructor(countOfStart, countOfStartHide) {
    this.countOfStart = countOfStart
    this.countOfStartHide = countOfStartHide
    this.w = [countOfStart, countOfStartHide]
    this.wHide = [countOfStartHide]
    this.T = [countOfStartHide]
    for (let i = 0; i < countOfStart; i++)
      for (let j = 0; j < countOfStartHide; j++) this.w[(i, j)] = Math.random()
    for (let i = 0; i < countOfStartHide; i++) {
      this.wHide[i] = Math.random()
      this.T[i] = Math.random()
    }
    this.Thide = Math.random()
  }
  ChangeRandWeightTHight(h, y, t, HiddenError, error) {
    for (let j = 0; j < this.countOfStartHide; j++) {
      for (let i = 0; i < this.countOfStart; i++) {
        this.w[(i, j)] -= h * HiddenError[j] * y[j] * (1 - y[j]) * t[i]
      }
      this.T[j] += h * HiddenError[j] * y[j] * (1 - y[j])
      this.wHide[j] -= h * error * y[j]
    }
    this.Thide += h * error
  }
}

class Perceptron {
  iter = 30
  iter_prog = 15
  h
  t = []
  y = []
  yHide = []
  Er
  Em
  RandWeightTHight
  countOfStart
  countOfStartHide
  constructor(
    a,
    b,
    c,
    d,
    countOfStart,
    countOfStartHide,
    maxError = 0.03,
    h = 0.236
  ) {
    this.h = h
    this.countOfStart = countOfStart
    this.countOfStartHide = countOfStartHide
    this.Em = maxError

    this.RandWeightTHight = new RandWeightTHight(countOfStart, countOfStartHide)
    this.t = [this.iter + this.iter_prog + this.countOfStart]
    this.y = [this.iter + this.iter_prog]
    this.yHide = [this.countOfStartHide]
    for (let i = 0; i < this.iter + this.iter_prog + this.countOfStart; i++) {
      this.t[i] = a * Math.cos(b * (i * 0.1)) + c * Math.sin(d * (i * 0.1))
    }
  }

  reverse() {
    do {
      this.Er = 0
      for (let k = 0; k < this.iter; k++) {
        this.y[k] = 0

        for (let j = 0; j < this.countOfStartHide; j++) {
          this.yHide[j] = 0
          for (let i = 0; i < this.countOfStart; i++) {
            this.yHide[j] += this.RandWeightTHight.w[(i, j)] * this.t[k + i]
          }
          this.yHide[j] -= this.RandWeightTHight.T[j]
          this.yHide[j] = 1 / (1 + Math.pow(Math.E, -this.yHide[j]))

          this.y[k] += this.RandWeightTHight.wHide[j] * this.yHide[j]
        }
        this.y[k] -= this.RandWeightTHight.Thide

        let er = this.y[k] - this.t[k + this.countOfStart]
        let Error = [this.countOfStartHide]
        for (let j = 0; j < this.countOfStartHide; j++) {
          Error[j] = er * 1 * this.RandWeightTHight.wHide[j]
        }
        this.RandWeightTHight.ChangeRandWeightTHight(
          this.h,
          this.yHide,
          this.t,
          Error,
          er
        )
        this.Er += Math.pow(er, 2)
      }
      this.Er *= 0.5
      console.log(this.Er)
    } while (this.Er > this.Em)
    this.Show(0, this.iter)
    this.AlgoritmProg()
  }
  AlgoritmProg() {
    for (let k = this.iter; k < this.iter + this.iter_prog; k++) {
      this.y[k] = 0

      for (let j = 0; j < this.countOfStartHide; j++) {
        this.yHide[j] = 0
        for (let i = 0; i < this.countOfStart; i++) {
          this.yHide[j] +=
            this.RandWeightTHight.w[(i, j)] * this.y[k + i - this.countOfStart]
        }
        this.yHide[j] -= this.RandWeightTHight.T[j]
        this.yHide[j] = 1 / (1 + Math.pow(Math.E, -this.yHide[j]))

        this.y[k] += this.RandWeightTHight.wHide[j] * this.yHide[j]
      }
      this.y[k] -= this.RandWeightTHight.Thide
    }
    console.log('\n')
    this.Show(this.iter, this.iter_prog)
  }
  Show(iter, priter) {
    for (let i = iter; i < iter + priter; i++) {
      const table = [
        {
          y: this.y[i],
          t: this.t[i + this.countOfStart],
          E: Math.abs(this.t[i + this.countOfStart] - this.y[i]),
        },
      ]
      console.table(table)
    }
  }
}

function main() {
  const data = {
    a: 0.1,
    b: 0.2,
    c: 0.3,
    d: 0.001,
    inner: 10,
    hiden: 4,
  }
  const p = new Perceptron({ ...data })
  p.reverse()
}

main()
