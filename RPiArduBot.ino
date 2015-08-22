#include <Motor.h>
/* A program to interface with python on rpi
 *
 * [Device , infoBit1, 2, 3]
 * Motor   A/B    Foward/Back     Val
 *
 * [  m    0/1       0/1         0 - 255]
 *
 * Servo   0 - 180    sweep
 *
 */


#define debug 1

//communication buffer of 4 bytes
String getInfo;
boolean strComplete = false;
Motor motorA(Motor::MOTOR_A);
Motor motorB(Motor::MOTOR_B);
void setup()
{
  // Open Serial communication
  Serial.begin(115200);
  Serial.println("Motor shield DC motor Test:\n");
  getInfo.reserve(5);
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
  int d;
  int v;
  v = (int)info[3];
  v = v < 0 ? (v + 256) : v; //convert signed char to unsigned
  //   subtract zero to convert
  d = (info[2] - '0') == 0 ? -1 : ((info[2] - '0') == 1 ? 1 : 0); //if direction is 0 then it is foward; if direction is 1 then backward, otherwise zero(no effect)
  //                     multiply to give direction (d is pos or neg)
  (info[1] - '0') == 0 ? motorA.move(v * d) : ((info[1] - '0') == 1 ? motorB.move(v * d) : doNothing()); //if motor is 0 then turn A motor; if motor is 1 then B motor, otherwise do nothing

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

}

void doNothing()
{
}
