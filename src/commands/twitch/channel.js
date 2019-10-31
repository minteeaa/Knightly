const { Command } = require('sylphy')
const db = require('quick.db')

class channel extends Command {
  constructor (...args) {
    super(...args, {
      name: 'channel',
      cooldown: 3,
      options: { guildOnly: true },
      usage: [
        { name: 'type', displayName: 'type', type: 'string', optional: true, last: false },
        { name: 'channel', displayName: 'channel', type: 'string', optional: true, last: true }
      ]
    })
  }

  async handle ({ args, client, msg }, responder) {
    const channel = args.channel
    const type = args.type
    if (!type) return responder.send('Valid channel types are: `twitch`')
    else if (type === 'twitch') {
      if (!channel) return responder.send('You _do_ need to mention a channel.')
      else {
        if (msg.channelMentions.length < 1) return responder.send('Mention a **valid** channel next time.')
        else {
          db.set(`${msg.channel.guild.id}.streamChannel`, msg.channelMentions[0])
          return responder.send(`Set <#${msg.channelMentions[0]}> as the twitch alert channel.`)
        }
      }
    }
  }
}

module.exports = channel
module.exports.help = {
  description: 'Set a channel for the Twitch live alerts.',
  usage: 'channel <channel mention>',
  group: 'twitch'
}
