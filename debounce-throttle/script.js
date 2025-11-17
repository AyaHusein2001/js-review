//The term debounce comes from electronics. When you’re pressing a button, let’s say on your TV remote, the signal travels to the microchip of the remote so quickly that before you manage to release the button, it bounces, and the microchip registers your “click” multiple times.

//debounce is forcing the function to wait for sometime before running again. If during that wait time the function is called again, the timer resets. that saves us from calling the function too many times in a short period, which makes the app more efficient.
const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

const updateDebounceText = debounce((text) => {
  debounceText.textContent = text;
}, 1000);

const updateThrottleText = throttle((text) => {
  throttleText.textContent = text;
}, 1000);

input.addEventListener("input", (e) => {
  defaultText.textContent = e.target.value;
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
});
//debounce function -- cb is callback function, delay is time in ms
// as nothing changed in one second it will call the function, if something changed , reset the timer back to one second and wait to see if anything changes again.
// take care that this is closure as that returned function remembers the timeout from the outer function
function debounce(cb, delay = 1000) {
  let timeout;
  // the function takes any number of args , it is generic
  return (...args) => {
    //clear the previous timer if any
    clearTimeout(timeout);
    //force the cb to wait for sometime before running again
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

//throttling , unlike debounce, guarantees the execution of a function at regular intervals, no matter how many times the event is triggered. It ensures that the function is called at most once in a specified time frame.
// this is great when things are changing a lot , and u wanna make a request at regular intervals , if u resize the window or scrolling or mouse movement , because u don't want to wait untill u are done resizing or scrolling to make the request

function throttle(cb, delay = 1000) {
  // the first time u call throttle , it immedialtely calls our callback function , then sets the shuold wait to true , so any subsequent calls within the delay period are ignored. After the delay period elapses, shouldWait is reset to false, allowing the next call to go through.
  let shouldWait = false;
  let waitingArgs;
  // its main function is to set the shouldWait flag back to false
  const timeoutFunc = () => {
    if (waitingArgs === null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };
  // start implementing from here
  return (...args) => {
    // if many events happened in the same second , we should not lose the last one , we will keep the last args
    if (shouldWait) {
      waitingArgs = args;
      return;
    }
    cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}

/*

Absolutely 😊 Let’s break this code **step by step in a super simple way** — imagine it’s controlling how often a function (like a search or scroll handler) can run.

---

### 🌱 What “throttle” means

**Throttle** means:

> “Don’t let a function run too often — only once every few milliseconds.”

So if the user keeps doing something quickly (like typing or scrolling), we limit how often the function actually runs.

---

### 🧩 The function structure

```js
function throttle(cb, delay = 1000) {
```

* `cb` → this is the function we want to control.
* `delay` → how long to wait before the next allowed call (default = 1 second).

---

### 🧠 Variables inside

```js
let shouldWait = false;
let waitingArgs;
```

* `shouldWait` → tells us if we are still in the waiting period.
* `waitingArgs` → remembers the **last** call’s arguments that happened during the waiting period (so we don’t lose it).

---

### ⏰ timeoutFunc

```js
const timeoutFunc = () => {
  if (waitingArgs === null) {
    shouldWait = false;
  } else {
    cb(...waitingArgs);
    waitingArgs = null;
    setTimeout(timeoutFunc, delay);
  }
};
```

Let’s make this easy:

* When the timer ends:

  * If nobody called the function during the delay → we’re free again (`shouldWait = false`).
  * If someone *did* call it → run it **once** with the latest data (`cb(...waitingArgs)`), then start a new delay timer again.

So it always keeps running the **last call** that happened during the waiting period — but not more.

---

### 🚀 Returned function

```js
return (...args) => {
  if (shouldWait) {
    waitingArgs = args;
    return;
  }
  cb(...args);
  shouldWait = true;

  setTimeout(timeoutFunc, delay);
};
```

This is the function you actually use when you call `throttle`.

#### What it does:

1. If `shouldWait` is `false` (we’re free):

   * Run `cb(...args)` right away.
   * Set `shouldWait = true` (start waiting).
   * Start a timer (`setTimeout(timeoutFunc, delay)`).

2. If `shouldWait` is `true` (still waiting):

   * Don’t run `cb` now.
   * Just **save the latest** arguments in `waitingArgs` (so when the waiting ends, it’ll use the most recent call).

---

### ⚙️ Example

Let’s say you throttle a function that logs your mouse position every 1 second.

If you move the mouse 10 times in a second:

* It logs the **first** movement immediately.
* Ignores the next 9 during that second — but remembers the **last one**.
* After 1 second, it logs that last one.
* Then it’s ready again.

---

### 🧾 Summary (super simple)

| Step | What happens                                                       |
| ---- | ------------------------------------------------------------------ |
| 1️⃣  | First call runs immediately                                        |
| 2️⃣  | Any other calls during the delay are ignored but last one is saved |
| 3️⃣  | After delay, runs last saved call if any                           |
| 4️⃣  | Repeats                                                            |

---

Would you like me to show you how this works visually with a simple timeline example (like “call 1 at 0ms, call 2 at 300ms, etc.”)?

*/
