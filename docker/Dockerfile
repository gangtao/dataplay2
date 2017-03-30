FROM ubuntu:trusty

RUN apt-get update
RUN apt-get install -y tar wget git

# Install nodejs/babel/bower
RUN apt-get install -y node
RUN apt-get install -y babel
RUN apt-get install -y npm

# patch to link node to nodejs
RUN sudo rm /usr/sbin/node
RUN sudo ln -s /usr/bin/nodejs /usr/sbin/node

RUN npm install -g bower

# Install anaconda
RUN mkdir /home/temp
RUN cd /home/temp \
	&& wget http://repo.continuum.io/archive/Anaconda2-4.1.1-Linux-x86_64.sh \
	&& bash Anaconda2-4.1.1-Linux-x86_64.sh -b

# TODO move anaconda to opt and chang owner/user for it
ENV PATH=/root/anaconda2/bin:/${PATH}:

# Get the code and build the client code
RUN cd /home \
	&& git clone https://github.com/gangtao/dataplay2

RUN cd /home/dataplay2/package/static \
	&& bower install --allow-root \
	&& npm install -g babel-cli \
	&& npm install babel-preset-es2015 --save \
	&& npm install babel-preset-react --save 

COPY ./start.sh /
RUN chmod 777 /start.sh
WORKDIR /

EXPOSE 5000

CMD ["/start.sh"]