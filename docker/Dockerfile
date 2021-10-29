FROM nginx 

COPY ./dist /data 

RUN rm /etc/nginx/conf.d/default.conf

ADD laputa-iot-dashboard.conf /etc/nginx/conf.d/default.conf 

RUN /bin/bash -c 'echo init ok'