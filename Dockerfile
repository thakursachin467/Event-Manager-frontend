FROM node:alpine as builder

WORKDIR /home/event-manager-client

COPY ./package.json ./
RUN npm install
COPY ./ ./

RUN npm run build


# /home/event-manager-client/build <-----all the stuff we care about for production is in build folder

FROM nginx
COPY --from=builder /home/event-manager-client/build /usr/share/nginx/html