# octo

node => 12.14.0

express, bcrypt, cors, sqlite3

.............................................

server address: https://gentle-peak-88297.herokuapp.com/

..............................................

## APIs

1### USER

1 signup
* route: /user/signup (POST)
* parameters: userName (optional), userEmail, userPassword

2 signin
* route: /user/signin (POST)
* parameters: userEmail, userPassword

3 signout
* route: /user/signout (POST)
* parameters: userEmail

4 delete
* route: /user/delete (DELETE)
* parameters: userEmail, userPassword


2### EVENT

1 create
* route: /event/create (POST)
* parameters: eventName, eventDate, eventLocation, allowedAttendeesCount

2 list
* route: /event/list (GET)
* parameters: date

3 delete
* route: /event/delete (DELETE)
* parameters: eventId


3### TASK

1 goto event
* route: /task/gotoEvent (POST)
* parameters: userId, eventId

2 attendees of an event
* route: /task/attendees (GET)
* parameters: eventId
