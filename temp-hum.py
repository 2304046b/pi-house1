# -*- coding: utf-8 -*-
import os
import time
import sys
from pubnub import Pubnub
import Adafruit_DHT as dht

pubnub = Pubnub(publish_key='pub-c-d7031905-2761-47d5-a9b4-d15da7ff1536', subscribe_key='sub-c-c34fe3bd-da3e-4394-a72d-4dd48ce71bbe')
channel = 'pi-house'

def callback(message):
    print(message)

#published in this fashion to comply with Eon
while True:
    h,t = dht.read_retry(dht.DHT22, 4)
    temp={0:0.1f}.format(t)
    hum={1:0.1f}.format(h)
    message = {'temperature': temp, 'humidity': hum}
    print 'Temp={0:0.1f}*C Humidity={1:0.1f}%'.format(t, h)
    pubnub.publish(channel=channel, message=message, callback=callback, error=callback)


