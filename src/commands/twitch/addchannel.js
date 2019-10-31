const { Command } = require('sylphy')
const got = require('got')
const db = require('quick.db')

class addchannel extends Command {
  constructor (...args) {
    super(...args, {
      name: 'addchannel',
      cooldown: 3,
      options: { guildOnly: true },
      usage: [
        { name: 'user', displayName: 'user', type: 'string', optional: true, last: true }
      ]
    })
  }

  async handle ({ args, client, msg }, responder) {
    const user = args.user
    const channelCheck = await got(`https://api.twitch.tv/helix/users?login=${user}`, {
      headers: {
        'Client-ID': process.env.CLIENT_ID
      }
    })
    const dn = JSON.parse(channelCheck.body).data[0].display_name
    if (dn == null) return responder.send('User not found.')
    else if (dn != null) {
      if (db.fetch(`${msg.channel.guild.id}.streamList`).includes(JSON.parse(channelCheck.body).data[0].id)) return responder.send('That user is already on the stream list.')
      else {
        db.push(`${msg.channel.guild.id}.streamList`, JSON.parse(channelCheck.body).data[0].id)
        // TODO: Add a tracker here to get the streamer's ID in knightly.js
        db.push(`${JSON.parse(channelCheck.body).data[0].id}.linkedServers`, msg.channel.guild.id)
        return responder.send(`Twitch user added: \`${JSON.parse(channelCheck.body).data[0].display_name}\`\nhttps://twitch.tv/${user}`)
      }
    }
  }
}

module.exports = addchannel
module.exports.help = {
  description: 'Add a channel to the twitch live alert list.',
  usage: 'addchannel <channel name>',
  group: 'twitch'
}
