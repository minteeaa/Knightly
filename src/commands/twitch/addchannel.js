const { Command } = require('sylphy')
const got = require('got')

class addchannel extends Command {
  constructor (...args) {
    super(...args, {
      name: 'addchannel',
      cooldown: 3,
      options: { guildOnly: true },
      usage: [
        { name: 'text', displayName: 'text', type: 'string', optional: true, last: true }
      ]
    })
  }

  async handle ({ args, client, msg }, responder) {
    const channelCheck = await got('https://api.twitch.tv/helix/streams', {
      headers: {
        'Client-ID': process.env.CLIENT_ID
      }
    })
    client.logger.info(channelCheck.body)
  }
}

module.exports = addchannel
module.exports.help = {
  description: 'Add a channel to the twitch live alert list.',
  usage: 'addchannel <channel name>',
  group: 'twitch'
}
