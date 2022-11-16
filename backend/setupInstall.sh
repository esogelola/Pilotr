#! /bin/bash

# This script is used to install the node modules for the project and then setup the database with the correct tables and data.

# Install the node modules
npm install

# Setup the database
node setupDatabase.js

# Start the server
node server.js




