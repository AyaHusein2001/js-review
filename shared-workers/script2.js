const worker = new SharedWorker("worker.js");
//start
worker.port.start();

worker.port.postMessage({
    command: "store_port",
    scriptNo: 2,
})

// send
worker.port.postMessage({
  command: "get_data",
  scriptNo: 2,
});

// receive
worker.port.onmessage = (e) => {
  console.log("Received:", e.data);
};

function send() {
  worker.port.postMessage({
    command: "send_data",
    text: "Message from script2",
    scriptNo: 2,
  });
}