# octo

node => 12.14.0

express, bcrypt, cors, sqlite3

.............................................

server address: https://gentle-peak-88297.herokuapp.com/

..............................................

APIs

----> USER

--------> signup
------------> route: /user/signup (POST)
------------> parameters: userName (optional), userEmail, userPassword

--------> signin
------------> route: /user/signin (POST)
------------> parameters: userEmail, userPassword

--------> signout
------------> route: /user/signout (POST)
------------> parameters: userEmail

--------> delete
------------> route: /user/delete (DELETE)
------------> parameters: userEmail, userPassword


----> EVENT

--------> create
------------> route: /event/create (POST)
------------> parameters: eventName, eventDate, eventLocation, allowedAttendeesCount

--------> list
------------> route: /event/list (GET)
------------> parameters: date

--------> delete
------------> route: /event/delete (DELETE)
------------> parameters: eventId


----> TASK

--------> goto event
------------> route: /task/gotoEvent (POST)
------------> parameters: userId, eventId

--------> attendees of an event
------------> route: /task/attendees (GET)
------------> parameters: eventId
