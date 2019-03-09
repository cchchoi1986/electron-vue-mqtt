var mqtt = require('mqtt')

module.exports = {
  getMsg: function() {
    return new Promise(resolve => {
      var client  = mqtt.connect('mqtt://broker.hivemq.com')
      console.log('here')

      client.on('connect', function () {
        console.log('connected');
        client.subscribe('test', function (err) {
          if (!err) {
            console.log('subscribe')
            client.publish('test', 'Hello mqtt')
            client.end()
          }
        })
      })

      client.on('message', function (topic, message) {
        // message is Buffer
        console.log('message received', message.toString())
        resolve(message)
        client.end()
        client.unsubscribe('test')
      })
    })
  }
}
