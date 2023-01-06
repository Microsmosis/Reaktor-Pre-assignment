## Web Application to view all pilots who have violated the "no-drone-zone"!

Information about drones and pilots are fetched from Reaktor's /drones and /pilots/:serial-number API's.
Drone information consists of the model of the drone, serial-number, IP, etc and the most important the position!

The area within the radius of 100 meters from the nest is a "no drone zone". By doing some calculations we can
confirm if a drone is within this radius.

If so, we will fetch the information of the pilot flying this drone by passing the serial-number of the drone to the
/pilots/:serial-number API. Only necessary information is parsed from the response.

The information is saved to a database. This data is then requested from the server by the client and the response
is rendered to the user.


### I decided to use websockets due to the frequent communication between client and server-side.

* The server is fetching drone and pilot data about every 2 seconds from Reaktor's API's.
* The client side is doing requests to the server via websockets in 2 second intervals as well.

If there is a issue with connecting or some error with the socket,
client side will use a service that calls internal API's to fetch data from database instead.

This assignment was done with React, NodeJS, Express, PostgreSQL.


Here is a link to the web app : https://reaktor-nesty.herokuapp.com/
