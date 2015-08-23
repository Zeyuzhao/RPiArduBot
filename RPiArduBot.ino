#include <Servo.h>
#include <Motor.h>
/* A program to interface with python on rpi
 *
 * [Device , infoBit1, 2, 3]
 * Motor    A/B   Foward/Back   Val
 *
 * [  m   0/1       0/1         0 - 255]
 *
 * Servo   pan/tilt      Position      none
 *
 * [s       0/1           0 - 180        0]
 *
 */


#define debug 1

//communication buffer of 4 bytes
String getInfo;
boolean strComplete = false;
Motor motorA(Motor::MOTOR_A);
Motor motorB(Motor::MOTOR_B);
Servo pan;
Servo tilt;

void setup()
{
  // Open Serial communication
  Serial.begin(115200);
  Serial.println("Motor shield DC motor Test:\n");
  getInfo.reserve(5);
  pan.attach(5);
  tilt.attach(6);
}

void loop() {
  if (strComplete)
  {
    String str = getInfo;
    switch(str[0])
    {
      case 'm' : //Motor
        handleMotor(str);

        break;
      case 'd' : //Distance sensor
        break;
      case 'c' : //Get Motor current consumption
        break;
      case 's' :
        handleServo(str);
        break;
      default:
        Serial.println("Error at:");
        Serial.println(getInfo);
    }

    getInfo = ""; //Reset bufver and then bool flag below
    strComplete = false;
  }
}

void serialEvent()
{
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    getInfo += inChar;
    if (getInfo.length() >= 4) {
      strComplete = true;
    }
  }
}

void handleMotor(String info)
{
  int d;  //direction
  int v; //pwm value
  int m; //which motor
  v = getInt(info[3]);
  //   subtract zero to convert
  d = info[2] - '0';
  d = (d == 0) ? -1 : (d == 1) ? 1 : 0; //if direction is 0 then it is foward; if direction is 1 then backward, otherwise zero(no effect)
  m = info[1] - '0';
  //         multiply to give direction (d is pos or neg)
  (m == 0) ? motorA.move(v * d) : (m == 1) ? motorB.move(v * d) : doNothing(); //if motor is 0 then turn A motor; if motor is 1 then B motor, otherwise do nothing

  #ifndef debug
  Serial.println("line: " + info);
  Serial.println("Value: " + String(v));
  Serial.println("Converted Value: " + String(v * d));
  Serial.println("Direction: " + String(info[2]));
  Serial.println("Converted Direction: " + String(d));
  #endif
}

void handleServo(String info)
{
  int p; //postion of the servo 1-180
  int m;  // servo 0 -> pan  | 1 -> tilt
  p = getInt(info[2]);
  m = (int)(info[1] - '0'); //get motor, pan or tilt
  (m == 0) ? pan.write(p) : ((m == 1) ? tilt.write(p) : doNothing());
}

void doNothing()
{
  //do absolutely nothing; void
}

//convert char to int
int getInt(char c)
{
  int v = (int)c;
  return v = v < 0 ? (v + 256) : v;  //convert signed char to unsigned
}
