setInterval(function () {
  process.send('yo, parent!');
}, 1000)