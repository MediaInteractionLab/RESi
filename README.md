# Smart Fabrics Web UI Framework

## How to Install

1. Clone the project from from the git repository

2. run `yarn` in the project root directory

3. run `yarn` in the client directory

4. set up MongoDB (either locally or online) and configure it in the app/parameters file

5. import filtertypes in database

## Running Project Locally

1. if local database is used start MongoDB

2. connect Arduino Prototype

3. run `yarn start` in the project root directory to start the back end application

4. run `yarn start` in  the client directory to start the front end

5. open browser window: `http://localhost:3000/`


## Building Client

The client can be built using `yarn build` in the client directory. The result of the build is that a production version of the build is copied to server/public directory.

The project can then be started running only `yarn start` in the project root directory and opening a browser window on `http://localhost:9000/`