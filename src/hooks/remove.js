# This will remove Apache

sudo service apache2 stop 
sudo apt-get purge apache2 apache2-utils apache2.2-bin apache2-common
sudo apt remove apache2.*
sudo apt-get autoremove
whereis apache2

# This will remove PHP
sudo apt-get purge `dpkg -l | grep php7.2| awk '{print $2}' |tr "\n" " "`
sudo apt-get purge php7.*
sudo apt-get autoremove --purge
whereis php
sudo rm -rf /etc/php

# This will remove MYSql
sudo service mysql stop
sudo apt-get remove --purge *mysql\*
sudo apt-get remove --purge mysql-server mysql-client mysql-common -y
rm -rf /etc/mysql
sudo apt-get autoremove
sudo apt-get autoclean


apache2 apache2-mpm-prefork apache2-utils apache2.2-common libapache2-mod-php* libapr1 libaprutil1 libdbd-mysql-perl libdbi-perl libnet-daemon-perl libplrpc-perl libpq5 mysql-client-5.5 mysql-common mysql-server mysql-server-5.5 php*-common php*-mysql

sudo mv /var/lib/dpkg/info/apache2.* /tmp