FROM node:16-buster-slim

ENV HOME /home/app

WORKDIR $HOME

RUN useradd app
RUN apt-get update -y

USER app

ADD . $HOME

CMD ["npm", "start"]
