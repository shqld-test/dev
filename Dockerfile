FROM node:16-buster-slim

ENV HOME /home/app

RUN mkdir $HOME
RUN useradd app
RUN apt-get update -y

WORKDIR $HOME
USER app
ADD . $HOME

CMD ["npm", "start"]
