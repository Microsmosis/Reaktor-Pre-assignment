Web Application to view all pilots who have violated the "no-drone-zone"!

Information about drones and pilots are fetched from Reaktor's /drones and /pilots/:serial-number API's.
Drone information consists of the model of the drone, serial-number, IP, etc and the most important the position!

The area within the radius of 100 meters of the nest is a no drone zone. By doing some calculations we can confirm if a 
drone is within this radius.

If so, we will fetch the information of the pilot flying this drone by passing the serial-number of the drone to the
/pilots/:serial-number API. Only necessary information is parsed from the response. This information is then outputted for users.

This assignment was done with React, NodeJS, Express, PostgreSQL.

Here is a link to the web app : http://reaktor-nesty.herokuapp.com/
