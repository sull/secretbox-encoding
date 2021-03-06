const crypto = require('crypto')
const Codec = require('./')

const key = crypto.randomBytes(32)

const codec = Codec(key)
const hello = codec.encode('hello')
const world = codec.encode('world')

console.log('%s %s', codec.decode(hello), codec.decode(world)) // 'hello world'

const pbs = require('protocol-buffers')

const { Message } = pbs(`
message Message {
  bytes data = 1;
}
`)

const codecx = Codec(key, { valueEncoding: Message })
const codecy = Codec(key, { valueEncoding: Message })
const buffer = codecx.encode({ data: Buffer.from('hello world') })
console.log(codecy.decode(buffer))
