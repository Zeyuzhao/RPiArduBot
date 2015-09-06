import serial
port = serial.Serial("/dev/ttyAMA0", baudrate=115200, timeout=3.0)
motorA = 0
motorB = 1

FMOVE = 0
BMOVE = 1


def move(motor, direction, speed):
    port.write("m" + str(motor) + str(direction) + chr(speed))
    

def Foward(speed = 255):
    move(motorA, FMOVE, speed)
    move(motorB, FMOVE, speed)
    return "f"

def Back(speed = 255):
    move(motorA, BMOVE, speed)
    move(motorB, BMOVE, speed)
    return "b"

def Left(speed = 255):
    move(motorA, FMOVE, speed)
    move(motorB, BMOVE, speed)
    return "l"

def Right(speed = 255):
    move(motorA, BMOVE, speed)
    move(motorB, FMOVE, speed)
    return "r"
def Stop():
    move(motorA, FMOVE, 0)
    move(motorB, FMOVE, 0)
    return "s"
def moveMotors(aSpeed, bSpeed):
    move(motorA, aSpeed.dir, aSpeed.s)
    move(motorB, bSpeed.dir, bSpeed.s)


    
################################Testing#########################################

if __name__ == '__main__':
    Foward()
    raw_input()
    Back()
    raw_input()
    Left()
    raw_input()
    Right()
    raw_input()
    Stop()
