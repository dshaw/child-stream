setInterval(function () {
  process.send({ msg: 'yo, parent!' });
}, 1000)
