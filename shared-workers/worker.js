let port1;
let port2;
// when some file connects
onconnect = function (e) {
  const port = e.ports[0];
  port.start();
  //when u receive a message
  port.onmessage = function (message) {
    switch (message.data.command) {
      case "store_port":
        if (message.data.scriptNo === 1) {
          port1 = port;
        } else {
          port2 = port;
        }
        break;
      case "get_data":
        if (message.data.scriptNo === 1) {
          port.postMessage("data from window 1");
        } else {
          port.postMessage("data from window 2");
        }
        break;

      case "send_data":
        if (message.data.scriptNo === 1) {
          port2.postMessage(message.data.text);
        } else {
          port1.postMessage(message.data.text);
        }
        break;
    }
  };
};
