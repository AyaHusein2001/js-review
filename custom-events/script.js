// const myEvent = new Event('myCustomEvent',{
//     bubbles: true,
//     cancelable: true,
//     composed: true
// });
// document.body.addEventListener('myCustomEvent', (e) => {
//     console.log("🚀 ~ e:", e)
    
// })
// //
// document.body.dispatchEvent(myEvent);

// we use custom event to pass data
const myEvent = new CustomEvent('myCustomEvent',{
  detail: {
    name: 'John',
    age: 30
  }
});
document.body.addEventListener('myCustomEvent', (e) => {
    console.log("🚀 ~ e:", e)
    
})
//
document.body.dispatchEvent(myEvent);

const button = document.querySelector('button');
const MAX_DOUBLE_CLICK_TIME = 500;
let lastClick = 0;
/*
2. cancelable: true
Means:
You are allowed to call: e.preventDefault();
to stop the event’s default action.
If cancelable is false, then preventDefault() does nothing.
Example:

Imagine a <form> that submits when you double-click something.
You can stop submission:

button.addEventListener('custom:doubleClickEvent', (e) => {
  e.preventDefault(); // Works ONLY if cancelable:true
  console.log("Double click blocked!");
});

If cancelable=false, this line does nothing.
*/
button.addEventListener('click', (e) => {
    const timeBetweenClicks = e.timeStamp - lastClick;
    //if it has been too long since the last click, just set the last click , so we can do the check again
    if (timeBetweenClicks > MAX_DOUBLE_CLICK_TIME) {
    lastClick = e.timeStamp;
        return
    }
    // if double click happened, create new event --> give it exact props that normal click have
    const doubleClickEvent = new CustomEvent('custom:doubleClickEvent', {
        bubbles: true,//this will allow the event to bubble up,If bubbles were false, only the button receives it and parent cannot detect it.
        cancelable: true,
        composed: true, // allow crossing shadow DOM (safe to always enable),A normal event does not leave Shadow DOM unless you allow:So: bubbles = can travel upward ,composed = can travel upward even out of a shadow DOM
        detail:{
            timeBetweenClicks
        }
    }
    );
    //dispatch the event on whatever was clicked
    e.target.dispatchEvent(doubleClickEvent);
    //reset the last click
    lastClick = 0;
})
button.addEventListener('custom:doubleClickEvent', (e) => {
    
    console.log("🚀 ~ e:", e.detail.timeBetweenClicks)
})