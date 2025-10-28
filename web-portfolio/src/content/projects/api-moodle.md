---
title: api-moodle
description: This is an API RESTFul proposal with academic and learning purposes, this API provides methods for other components/services to access a Moodle web service and its functions.
img: /images/default-no-image.jpg
techs: ["nest","ts","mysql","docker"]
git-repository: https://github.com/Wogcas/api-moodle
---

This is an API RESTFul proposal with academic and learning purposes, this API provides methods for other components/services to access a Moodle web service and its functions.

As part of a distributed systems project, I developed an intermediary service to handle communication with the official Moodle API. Named "api-moodle," this service was built using NestJS and TypeScript to create a robust and type-safe solution.

I set up my own Moodle instance, hosted locally and containerized with Docker, to serve as the back-end. This allowed me to perform HTTP requests to the server, consume data from the service, and customize it to meet specific project needs. The Moodle instance utilized a SQL database to manage its data.