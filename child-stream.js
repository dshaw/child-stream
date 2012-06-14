var util = require('util')
  , Stream = require('stream')


module.exports = ChildStream


function ChildStream (child_process) {
  if (!(this instanceof ChildStream)) return new ChildStream(child_process)

  var self = this

  child_process.on('message', function on_message (message) {
    self.emit('data', typeof message === 'object' ? JSON.stringify(message) : message)
  })

  child_process.on('exit', function on_exit () {
    self.emit('end')
  })
}

util.inherits(ChildStream, Stream)