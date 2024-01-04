# #FROM nginx
# #RUN apt-get update
# #RUN apt-get install -y wget
# #RUN apt-get install -y unzip
# #RUN wget http://bitbucket-project-builds.s3-website-us-east-1.amazonaws.com/ey-exim/frontend/0.1.5/app.zip
# #RUN unzip app.zip
# #RUN cp -r /dist/app /usr/share/nginx/html
# #COPY nginx.conf /etc/nginx/conf.d/default.conf

# FROM node:latest as build
# RUN apt update -y
# RUN apt upgrade -y
# WORKDIR /app
# COPY . .
# RUN npm install -g @angular/cli
# RUN ng build --prod

# FROM nginx:latest
# RUN apt update -y
# RUN apt upgrade -y
# COPY --from=build /app/dist/app /usr/share/nginx/html/app
# COPY nginx.conf /etc/nginx/conf.d/default.conf



# ------------ Below Added By VJ on 2nd April 2021 @ 9.19PM


#################
# Build the app #
#################
FROM node:12-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN ng build --configuration production

################
# Run in NGINX #
################
FROM nginx:alpine
COPY --from=build /app/dist/app /usr/share/nginx/html/app
COPY nginx.conf /etc/nginx/conf.d/default.conf

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/app/assets/system.env.template.js > /usr/share/nginx/html/app/assets/system.env.js && exec nginx -g 'daemon off;'"]