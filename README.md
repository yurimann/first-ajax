# Your First (Several) Asynchronous Requests

## Review (Synchronous vs. Asynchronous)
You are already a pro at making HTTP requests from your Browser to your Server. For instance, when you click a link, submit a form, or enter a new address into your browser bar, you are firing off an HTTP request. You've learned to make your server send back different types of data in text, HTML, JSON, and other formats, and how to redirect the browser to another location.

### Synchronous
These normal requests freeze the browser's interface, so the user must wait for them to finish before taking any new action. Usually the browser will display an entirely new HTML page to the screen. Since everything must wait for these requests, we call them "Synchronous". That means "no two things can happen at the same time."

### Asynchronous
As we saw during today's lecture, your browser can also make requests in the background. These requests do not block or freeze the user's interface, and other operations can take place while they are running. We refer to them as "Asynchronous" because of this trait. They have the ability to replace the entire screen, or just update a small section of the page. This enables the construction of more fluid, "desktop-application-like" user experiences. For example, Trello https://trello.com/ (an online organizational tool), allows the creation and re-ordering of cards without any full page refreshes. Asynchronous requests are everywhere in modern web applications.

You will often hear this style of JavaScript-driven Asynchronous requests referred to as AJAX.

## Instructions
In today's assignment, you will write code exclusively for the client-side (browser). We have gone ahead and built a server for you to interact with. In the following few days, you will retake control over both the client and server-side code.

You should fork, then clone the skeleton repository at:
- `http://github.com/bitmakerlabs/ajax-intro
When this assignment asks you a question, enter the answer on a new line directly below. This file should be called README.md and live at the top of the repository.

The server you will be interacting with is:
- `http://bitmaker-api.herokuapp.com`

The URLs within the server (AKA 'endpoints', AKA 'resources') we're going to work with are:
- `/` <- the root path
- `/ping`
- `/pong`
- `/count`
- `/time`
- `/a_car`

Each time you use one of these paths, you will have to use the fully-qualified URL. For example:
- `http://bitmaker-api.herokuapp.com/count`
- or
- `http://bitmaker-api.herokuapp.com/ping`

## Step 0 - Setup and Knowledge Check
- Consider disabling your browser extensions, as they might make unexpected and confusing HTTP requests. For Chrome users, the easiest way to do this is opening a "New Incognito Window" from the File menu and running your requests there.
- Open your browsers "Developer Tools/Inspector". Navigate to the "Netowrk" tab. You should keep this open for the duration of the assignment.

###Knowledge Check
In your browser's address bar, type the "root path" of the server we provided you, and hit enter. Inspect the request in the Network tab by clicking on it.
1. What HTTP method did your browser use to make the request?
2. How many milliseconds did it take your browser to complete the request?
3. What HTTP status code did the server return? What does that mean?
4. Was this an AJAX/Asynchronous request or a normal Synchronous request? How can you tell?

## Step 1 - Your First AJAX Request
We're going to use jQuery to make our AJAX requests. An easy, flexible, and powerful way to do this is using the `ajax` function inside jQuery. To invoke the `ajax` function, you call it on the `$` object, and pass in a JavaScript object as an argument. Every time we make an AJAX request, we will specify __4__ main attributes.

1. The __url__ ( e.g. 'http://fun.com/pets', '/pets', or 'pets' )
  - _Which server-side resource(s) is the request interacting with?_
2. The __method__ ( e.g. 'GET', 'POST', 'PATCH', 'PUT', or 'DELETE' )
  - _What is the request trying to do?_
3. The __data__ ( A JavaScript object e.g. {}, {water: 'wet'} )
  - _What information should the request send TO the server?_
4. The __dataType__ ( e.g. 'text', 'html', 'json', or 'xml' )
  - _What type of data does the browser expect in response?_

Here is the basic skeleton of an AJAX call. It is missing values for it's 4 attributes, but you can use it as a template for the practice sections:
```javascript
$.ajax({
  url: ,
  method: ,
  data: ,
  dataType:
});
```

###Practice
1. In your ajax.js file, build an AJAX request that:
  - _retrieves the information at the root path of the server, sending an empty JavaScript object, and expects a text response._
2. Wrap the request in a `$(document).ready`. Run it by reloading your page in the browser.
3. What do you see in the Network tab of your Developer Tools? How does it differ from the request you made in Step 0?
4. How is it similar to the request from Step 0?

Congratulations! You've now made your first successful AJAX request!

## Step 2 - Binding to A Click Event
It can be useful to fire off an AJAX request as soon as the page is finished loading. However, it's more common for them to run as a result of a user taking action on your page. Currently, our AJAX requests run immediately on `$(document).ready`. We triggered it each time by refreshing the page. Let's separate the two events with a "click event handler" similar to the others you practiced this week.

###Practice
1. Add a `<button>` to the HTML page that says "Run the AJAX". Give it an id attribute.
2. Create a 'click' event handler for the button, and move your AJAX call inside it.
3. Refresh your page to load the new JavaScript.
4. Try clicking your button a few times! In your network tab, inspect the requests as they come in.

Now we are in control of when the request is made.

## Step 3 - Using Information in the Response
The root path of our server indicated "success", but didn't send any content back. Usually, a successful response will return some data to the browser... How do we take action in this success scenario? How do we make use of the data the server sends back?

jQuery's lets us "chain" a call to the function `done` on the end of our call to `$.ajax`. As an argument to the `done` function, we can pass in another brand-new function. It will be called if-and-when the AJAX request succeeds. You already know how to pass functions that will be called when an event occurs, so this may sound familiar. This concept of "callback functions" extends to AJAX, and it looks like this:

```javascript
$.ajax({
  url: ,
  method: ,
  data: ,
  dataType:
}).done(function (responseData) {
  //Here in the callback, we have a variable called responseData
  //that holds the content of the server's response,
  //in this case, a simple string
});
```

Let's switch to a URL that returns data in its response, and write a function to do something with it.

###Practice
1. Comment out your previous AJAX request so that it will not run
2. Create a new AJAX request that retrieves the information at the `/ping` url (Send no data, expect text as a response). It should run when the same `<button>` from the last step is clicked.
3. Open your Network tab, reload the page, and run your request.
4. Investigate the Response sub-tab, what is different between this request and the one in Step 1?
5. In a `done` callback, use console.log to write the responseData string to the console.
6. Also in the `done` callback use jQuery to append the responseData string to the `<body>` element.

## Step 4 - When Things Go Wrong...
Just like any HTTP request, AJAX requests don't always work out. You might have the `url` wrong, be sending the wrong `data`, or perhaps your user just entered a subway tunnel and the internet cuts out. Sometimes, it is important to anticipate this situation and handle the outcome in a graceful way.

Just like with `done`, we can pass a callback function to `fail`. It will be called if-and-when the request fails.

```javascript
$.ajax({
  url: ,
  method: ,
  data: ,
  dataType:
}).fail(function () {
  //In this callback, everyone panic! Our request has failed!
  //Quickly, apologize to the user and try to fix it!
});
```

###Practice
1. Modify your AJAX request so that it points to the `/pong` url. Note that it's now p-o-n-g not p-i-n-g. This will simulate a server error.
2. Open your Network tab, reload the page, and run your request.
3. What is the new HTTP status code?
4. Add a `fail` callback, and use jQuery to append a nice message to the `<body>` telling the user that you'll try harder next time.

## Step 5 - Tidy Up Time...
Sometimes, there's code that needs to be run whether the request was a total success or a complete failure. You don't care about the outcome, but the request-response cycle has finished and there's cleanup work to do.

Maybe you want to re-enable the submit button on a form, hide a spinning "loading" indicator, or tidy up some local data. It wouldn't be very D.R.Y. to duplicate this code in both the `done` and `fail` callbacks, so there's one final function you can chain onto `$.ajax` ... the `always` function.

```javascript
$.ajax({
  url: ,
  method: ,
  data: ,
  dataType:
}).always(function () {
  //Well, I'm not really sure how that went, and I don't care
  //All I know is, it's over.
});
```
###Practice
1. Add an `always` callback, and use console.log to output a message like "Hey the request finished!"

## Step 6 - All Together Now!
So `$.ajax` requests will usually have a `done` callback, and they can use `fail` and `always` when appropriate. You should now have an AJAX request with a structure similar to this:

```javascript
$.ajax({
  url: ,
  method: ,
  data: ,
  dataType:
}).done(function (responseData) {
  //Yay we did it!
}).fail(function () {
  //That did NOT go well.
}).always(function () {
  //All I know is, it's over.
});
```

###Practice
1. Ensure that each of the `done`, `fail`, and `always` callbacks at least applies a meaningful console.log message.
2. Switch back and forth between the `/ping` and `/pong` URLs, reloading the page each time. What do you see in your Developer Tools? What messages show up in your console?

## Step 7 - The Hive Mind (Shared State)
You and your fellow classmates all been interacting with the same server, hosted on Heroku. That's what makes today's assignment different from the Tic-Tac-Toe and Circle Games. The State (AKA memory, data, information) is stored on the _server_, not locally on your browser. Our Jazzy Front-End Applications can now speak to a server with a database, just like our Non-AJAX rails apps from weeks 3 and 4.

To prove to you that you are all connected, we're going to change URL's once again.

###Practice
1. Comment out your second AJAX request
2. Build a third AJAX request that retrieves the info at the `/count` URL. Again, send no data, and expect 'text' type data in response.
3. Investigate your network tab. This is a shared count of the total number of bitmakers to ever visit this URL. Ask your neighbour what number they got and compare. Try refreshing and compare again!

## Step 7 - Sending Data with your Request
It's time for our AJAX request to send information TO the server, in addition to getting responseData FROM the server. We do this by supplying a JavaScript object as `data` in our call to `$.ajax`. It is a set of key-value pairs and looks like this:

```
$.ajax({
  url: ,
  method: ,
  data: {food: 'pancakes', quantity: 6, type: 'blueberry'},
  dataType:
})
```

These "request parameters" will be sent to our server, and may affect the response we get back. The contents of the `data` object can vary. Sometimes the values are hard-coded, while other times they are from a user typing in a form. Any piece of information we want to accompany our request should be encoded in this data object.

###Practice
1. Comment out your third AJAX request
2. Build a fourth AJAX request that retrieves the info at the `/time` URL. Again, send no data, and expect 'text' type data in response. Refresh the page and inspect.
3. Add a `done` callback and write the responseData to the `<body>` of the document.
4. Modify the request to send a `timezone` as a piece of data (e.g. 'Europe/Sofia').
5. Try sending a few different strings, and watch the response change. Some other valid timezones are: Europe/Athens, Europe/Lisbon, America/Mexico_City, Pacific/Honolulu, Asia/Kolkata, Pacific/Auckland
6. Add a `fail` callback that writes an error message to the `<body>` of the document. What happens if you change your data to an invalid `timezone` such as 'pokeroo'?


## Step 8 - Receiving HTML in the Response
Until now, every response we've received from the server was a 'text' type response. It's only been a string that we can console.log, or write to our document. It's common for servers to respond with more complex types, such as 'html'. Let's switch to a URL that will give us an 'html' type response. We call this an HTML "fragment", because it is missing the `<html>`, `<head>`, and `<body>` tags, and just holds a small chunk of HTML markup.

###Practice
1. Comment out your fourth AJAX request
2. Build a fifth AJAX request that retrieves the info at the `/a_car` URL. Expect 'html' type data in response. Your request does not need to send any data at this time. Refresh the page and inspect the response.
3. What do you see in the Accepts header of the Request, and the Content-Type header of the response?
4. Add a `done` callback and write the responseData to the `<body>` of the document.

## Step 9 - Binding to A Click Event
Currently, our AJAX requests run right away on `$(document).ready`. We've been triggering them each time by refreshing the page. Let's separate the two events with a "click event handler" that you practiced this week.

###Practice
1. Add an empty unordered list to the HTML page `<ul>`. Give it an id attribute.
2. Add a `<button>` to the HTML page that says "Load Another Car". Give it an id attribute.
3. Create a 'click' event handler for the button, and move your fifth AJAX call inside it.
4. Modify the `done` handler so that it appends new cars into the unordered list.
5. Refresh your page, and try your new button a few times! Open your network tab and inspect the requests as they come in.

That's it, you're done! Commit this README.md file with your answers in it, and push!

### Stretch
1. There's a hidden message at the '/pong' URL... did you find it?
2. Return to Step 6, where you get the shared `/count`. This URL actually accepts a data parameter called 'amount'. What are the acceptable values for it? What does it do?
3. Return to Step 7, where you send a timezone to the `/time` URL. Change the trigger for your AJAX request to button click event. Change from a hardcoded timezone parameter to accepting input from the user via a textbox.
