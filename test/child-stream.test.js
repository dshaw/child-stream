var child_stream = require('..')
  , ChildStream = child_stream
  , child_process = require('child_process')
  , Stream = require('stream')
  , tap = require('tap')
  , test = tap.test

test('ChildStream test', function (t) {
  t.ok(ChildStream, 'exports ChildStream')

  var cp = child_process.fork(__dirname + '/fixtures/send-object.js')
    , cs = child_stream(cp)

  t.isa(cs, ChildStream, 'instance of ChildStream')
  t.isa(cs, Stream, 'is an instance of Stream')

  t.test("data stream", function (t) {
    t.plan(1)
    cs.on('data', function (data) {
      t.equal(data, JSON.stringify({"msg":"yo, parent!"}), 'child stream has data')
      t.end()
    })
  })

  t.test("data stream exit", function (t) {
    t.plan(1)
    cs.on('end', function (data) {
      t.ok(true, "child process exit closes stream")
      t.end()
    })
    cp.kill()
  })

  var cp_s = child_process.fork(__dirname + '/fixtures/send-string.js')
    , cs_s = child_stream(cp_s)

  t.test("data stream - string message", function (t) {
    t.plan(1)
    cs_s.on('data', function (data) {
      t.equal(data, 'yo, parent!', 'child stream has a string')
      t.end()
    })
  })

  t.end()
})
