# Base image
FROM node:7-slim

ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production

# Create the root application directory
RUN mkdir /app && cp -a /tmp/node_modules /app/

# Set the work directory
WORKDIR /app

# Expose the port
EXPOSE 8080

# Start the app
CMD node server.js

CMD [ "npm", "start" ]
