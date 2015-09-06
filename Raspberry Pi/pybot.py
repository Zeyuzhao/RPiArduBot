from flask import Flask,render_template
from flask.ext.socketio import SocketIO, emit
import RPi.GPIO as GPIO

from motor import *

app = Flask(__name__)
socketio = SocketIO(app)

'''
Use for debugging
@app.route("/pin/<changePin>/<action>")
def action(changePin, action):
    changePin = int(changePin)
    GPIO.setup(changePin, GPIO.OUT)
    if action == "on":
     	GPIO.output(changePin, GPIO.HIGH)
    if action == "off":
     	GPIO.output(changePin, GPIO.LOW)
    return action
'''

@app.route("/robot/<action>")
def movement(action):
    switcher = {
        "f": Foward,
        "b": Back,
        "l": Left,
        "r": Right,
	"break": Stop
    }
    func = switcher.get(action, lambda: "none")
    print func()
    return func()



@socketio.on('motor',namespace = 'robot')
def handleMotor(info):
    a = info['x']
    b = info['y']
    moveMotors(a, b)


@app.route("/")
def index():
    templateData = {}
    return render_template("index.html", **templateData)

@app.route("/script.js")
def script():
    templateData = {}
    return render_template("script.js", **templateData)

if __name__ == '__main__':
    socketio.run(app, host = '0.0.0.0', port = 80)
