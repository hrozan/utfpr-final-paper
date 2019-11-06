#!/usr/bin/env bash
mosquitto_pub -h hrozan.xyz -t test -m "hello again" -p 8883 --capath /etc/ssl/certs/ -u "hrozan" -P "t1i2i5"
#mosquitto_sub -h hrozan.xyz -p 8883 --capath /etc/ssl/certs/  -t test -u "hrozan" -P "t1i2i5"
