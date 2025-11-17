const worker = new SharedWorker("worker.js");
//start
worker.port.start();

worker.port.postMessage({
    command: "store_port",
    scriptNo: 1,
})
// send a request to the worker so that it gives u the data
worker.port.postMessage({
  command: "get_data",
  scriptNo: 1,
});

// receive
worker.port.onmessage = (e) => {
  console.log("Received:", e.data);
};

function send() {
  worker.port.postMessage({
    command: "send_data",
    text: "Message from script1",
    scriptNo: 1,
  });
}
