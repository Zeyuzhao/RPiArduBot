import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

#motor channels
MotorA = [17, 18]
MotorB = [22, 23]

#set all channels to out
GPIO.setup(MotorA + MotorB, GPIO.OUT)



#foward to motor (hbridge)
def fMotor(channel):
    GPIO.output(channel, [GPIO.HIGH, GPIO.LOW])
#backward to motor
def bMotor(channel):
    GPIO.output(channel, [GPIO.LOW, GPIO.HIGH])
def sMotor(channel):
    GPIO.output(channel, [GPIO.LOW, GPIO.LOW])

def Foward():
    fMotor(MotorA) 
    fMotor(MotorB)
    return "f"

def Back():
    bMotor(MotorA)
    bMotor(MotorB)
    return "b"

def Left():
    fMotor(MotorA)
    bMotor(MotorB)
    return "l"

def Right():
    bMotor(MotorA)
    fMotor(MotorB)
    return "r"
def Stop():
    sMotor(MotorA)
    sMotor(MotorB)
    return "s"
    
################################Testing#########################################
#Foward()
#raw_input()
#Back()
#raw_input()
#Left()
#raw_input()
#Right()
#raw_input()
#Stop()
    
