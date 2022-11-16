FROM node:16 AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY ./src ./src
COPY ./docs ./docs
COPY ./build.ts .
COPY ./tsconfig.json .
COPY ./README.md .
RUN mkdir bin

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/docs ./docs

# Copy a new configuration file setting listen port to 8080
COPY ./docker/bibtex-tidy.conf /etc/nginx/conf.d/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

