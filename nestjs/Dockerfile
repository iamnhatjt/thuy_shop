#use the official Node.js 14 image as the base image
FROM node:20.5.1

#set the working directory in the container
WORKDIR /app


# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY src ./src
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY .eslintrc.js ./
COPY .prettierrc ./

#build the application
RUN npm run build

#expose the port that the application will be running on
EXPOSE 3005

#start the nestjs application
CMD ["npm", "run", "start:prod"]