//Вариант 1

const x = [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
]
const e = [1, 0, 0, 0]

function bipolar(s) {
  if (s >= 0) {
    return 1
  } else if (s < 0) {
    return -1
  }
}

function show(arr) {
  for (let ar of arr) {
    const table = [{ T: ar.t, W: ar.w }]
    console.table(table)
  }
}

function learn() {
  const arr = []
  let h = 0.456
  let count = 0
  let i
  while (count !== 4) {
    let w = [Math.random(), Math.random()]
    let T = Math.random()
    for (i = 0; i < e.length; i++) {
      let s = 0
      let y = 0
      for (let j = 0; j < w.length; j++) {
        s += x[i][j] * w[j] - T
      }
      y = bipolar(s)
      if (y === e[i]) {
        count++
        let test = []
        for (let _w of w) {
          test.push(_w)
        }
        arr.push({ t: T, w: test })
      } else {
        for (let j = 0; j < w.length; j++) {
          w[j] -= h * x[i][j] * (y - e[i])
          T += h * (y - e[i])
        }

        if (i !== 4) {
          continue
        } else {
          i = 0
        }
      }
    }
  }
  show(arr)
}

learn()
