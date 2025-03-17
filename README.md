## Description

Simple REST API to return month-end stock prices using yahoo-finance2.

## Project setup
The repository contains the nest.js backend. 
To deploy to a server which itself exposes a docker container:
```bash
$ mkdir ~/stock-history
$ cd ~/stock-history
```
Then copy the Dockerfile and update_from_git.sh script 
from the root of this repo into the newly created folder
and make the script executable

```bash
$ chmod +x update_from_git.sh
```

## Build for the first time

```bash
$ cd ~/stock-history
$ sudo docker build -t stock-history .
$ sudo docker run -d -p 3000:3000 --name stock-history-container stock-history-image
```

## Set the container up as service

```bash
sudo nano /etc/systemd/system/stock-history.service
```
and add this to the file
```bash
[Unit]
Description=Stock History Docker Container
After=network.target

[Service]
Restart=always
ExecStart=/usr/bin/docker start -a stock-history-container
ExecStop=/usr/bin/docker stop -t 2 stock-history-container

[Install]
WantedBy=default.target
```
## Enable and Start the Service

```bash
$ sudo systemctl enable stock-history.service
$ sudo systemctl start stock-history.service
$ sudo systemctl status stock-history.service
```
## Update
To update it (rebuild the container) from the latest version here on git:


```bash
$ cd ~/stock-history
$ ./update_from_git.sh
```

