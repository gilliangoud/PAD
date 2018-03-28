import json
import sys
import time

#from neopixel import *

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

def get_led_position(coll ,pos_x ,pos_y):
        index = 0
        if(pos_y % 2):
            index = (pos_y*coll)-(coll-pos_x)
        else:
            index = (pos_y*coll)-(pos_x-1)
        print("index:",index)
        return index-1

#led_strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT)
#led_strip.begin()
index = get_led_position(coll,current_x,current_y)

#Read data from stdin
def read_in():
    lines = sys.stdin.readline()
    return json.loads(lines)

while (True):
    sys.stdout.flush()
    data = read_in()
    sys.stdout.flush()
    if data:
        current_x = data['x']
        current_y = data['y']
    #led_strip.setPixelColor(index,Color(0,0,0))
    index = get_led_position(coll,current_x,current_y)
    #led_strip.setPixelColor(index,Color(255,255,0))
    #led_strip.show()
