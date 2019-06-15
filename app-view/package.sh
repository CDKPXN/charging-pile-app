#!/bin/sh
./install.sh
npm run build
tar -zcf build.tar.gz ./dist deploy.sh ./nginx_conf