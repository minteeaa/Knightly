const { Client } = require('sylphy')
const randomColor = require('randomcolor')

class knightlyBot extends Client {
  constructor (options = {}) {
    super(options)
    this.normalColor = parseInt(randomColor({ luminosity: 'light', hue: 'blue' }).replace('#', '0x'))
    this.red = randomColor({ hue: 'red' }).replace('#', '0x')
    this.green = randomColor({ hue: 'green' }).replace('#', '0x')
    this.blue = randomColor({ hue: 'blue' }).replace('#', '0x')
  }
}

module.exports = knightlyBot
