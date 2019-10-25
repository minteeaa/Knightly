const chalk = require('chalk')
module.exports = {
  priority: 5,
  process: container => {
    /* eslint-disable */
    const { client, msg, commands, logger, isPrivate, isCommand } = container;
    if (!isCommand) return Promise.resolve()
    logger.info(`${chalk.magenta.bold(!isPrivate ? msg.channel.guild.name : '(in PMs)')} > ` +
      `${chalk.blue.bold(msg.author.username + '#' + msg.author.discriminator)}: ` +
      `${chalk.white.bold(msg.cleanContent.replace(/\n/g, ' '))}`)
    return Promise.resolve(container)
  }
}
