const { Command } = require('sylphy')
const got = require('got')
const db = require('quick.db')

class removechannel extends Command {
  constructor (...args) {
    super(...args, {
      name: 'removechannel',
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
    const sl = db.fetch(`${msg.channel.guild.id}.streamList`)
    const cn = db.fetch(`${JSON.parse(channelCheck.body).data[0].id}.linkedServers`)
    const tid = JSON.parse(channelCheck.body).data[0].id
    if (dn == null) return responder.send('User not found.')
    else if (dn != null) {
      if (sl == null) return responder.send('The stream list is empty.')
      else if (sl.includes(tid)) {
        const nl = removeA(sl, tid)
        const na = removeA(cn, msg.channel.guild.id)
        db.set(`${msg.channel.guild.id}.streamList`, nl)
        db.set(`${JSON.parse(channelCheck.body).data[0].id}.linkedServers`, na)
        return responder.send(`Twitch user removed from list: \`${dn}\``)
      } else if (!sl.includes(tid)) {
        return responder.send('That user is not on the stream list.')
      }
    }
  }
}

function removeA (arr) {
  let what
  const a = arguments
  let L = a.length
  let ax
  while (L > 1 && arr.length) {
    what = a[--L]
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1)
    }
  }
  return arr
}

module.exports = removechannel
module.exports.help = {
  description: 'Remove a channel from the twitch live alert list.',
  usage: 'removechannel <channel name>',
  group: 'twitch'
}
