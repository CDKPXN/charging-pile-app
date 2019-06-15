#!/bin/sh

yum install -y nginx

user=nginx
group=nginx

#create group if not exists
egrep "^$group" /etc/group >& /dev/null
if [ $? -ne 0 ]
then
    groupadd $group
fi

#create user if not exists
egrep "^$user" /etc/passwd >& /dev/null
if [ $? -ne 0 ]
then
    useradd -g $group $user
fi

mkdir -p /home/nginx
mkdir -p /home/nginx/log
mkdir -p /home/nginx/pid
mkdir -p /home/nginx/charge_pile
mkdir -p /home/nginx/charge_pile/log

chown -R nginx.nginx /home/nginx

\cp ./nginx_conf/nginx.conf /etc/nginx -f
\cp ./nginx_conf/vhost/ /etc/nginx -f
\cp ./dist/* /home/nginx/charge_pile/ -rf