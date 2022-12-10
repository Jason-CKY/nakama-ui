FROM node:16-buster as dev

# set ssl false for work environment
RUN npm config set strict-ssl false

COPY ./frontend /app
WORKDIR /app
EXPOSE 3000
RUN npm install -l
CMD npm start

FROM dev as production

RUN npm install -l; npm run build
RUN npm install -g serve

CMD serve -s build
