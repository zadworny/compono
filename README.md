# Browsing Candidates

This is an example full-stack project in Docker Compose consisting of three services: `backend`, `api` and `app`. The `backend` is a mock of a legacy service that returns data of some job candidates. The `api` and `app` are a scaffolding of a web application with a PHP server (`api`) and a JavaScript frontend (`app`).

## Setup

To run the project you need Docker with Docker Compose installed.

To start the project run:

```
docker compose up
```

Then open the `http://localhost:8080/` URL in your browser.

## The Task

Your task is to extend the `app` and `api` services to build a simple web application that will allow browsing the candidates returned from the `backend` service.

To read from the `backend` service, you will first need to authenticate with a GET request to `/auth` endpoint. Find the `SECRET_KEY` in the project configuration and send it in a `key` search param - for instance `/auth?key=12345`. The body of the response will contain a `token`.

With the `token` you can send GET requests to `/` endpoint of the `backend` service. Use the HTTP header:

```
Authorization: Bearer [token]
```

The OK response should be a list of candidates in an XML format. The endpoint returns a maximum of 10 candidates at a time. Use an `offset` search parameter to get additional records - like `/?offset=10`.

Implement the above logic in PHP, in the `api` service, in order to not expose the `SECRET_KEY` to the end user.

Build the front end user interface of the application in the `app` service. A Vite setup for a Single Page Application has been provided for your convenience, with a proxy to the `api` service configured. Feel free to extend it with a JavaScript framework or libraries of your choice, or go vanilla.

Please do not modify the `backend` service.
