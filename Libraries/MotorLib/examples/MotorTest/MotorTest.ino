#include <Motor.h>
Motor motorA(Motor::MOTOR_A);

void setup() {
  // put your setup code here, to run once:
  
}

void loop() {
  // put your main code here, to run repeatedly:
  motorA.move(255);
  delay(1000);
  motorA.move(0);
  delay(1000);
}
