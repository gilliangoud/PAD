import json
import sys
import time

from neopixel import *

LED_COUNT   = int(sys.argv[3])      # Number of LED pixels.
LED_PIN     = 21      # GPIO pin connected to the pixels (must support PWM!).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA     = 10       # DMA channel to use for generating signal (try 5)
LED_INVERT  = False   # True to invert the signal (when using NPN transistor level shift)

current_x = 1
current_y = 1
coll = int(sys.argv[1])
rows = int(sys.argv[2])
index  = 0

led_strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT)
led_strip.begin()
index = get_led_position(coll,current_x,current_y)

while (True):
    led_strip.setPixelColor(index,Color(255,255,0))
    data = read_in()
    print(data)
    led_strip.show()

def get_led_position(coll ,pos_x ,pos_y):
        index = 0
        if(pos_y % 2):
            print("oneven")
            index = (pos_y*coll)-(coll-pos_x)
        else:
            print("even")
            index = (pos_y*coll)-(pos_x-1)
        print(index)
        return index-1

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])
