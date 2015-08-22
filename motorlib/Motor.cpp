#include "Arduino.h"
#include "Motor.h"

Motor::Motor(int select)
{
  if (select == 0) // Option for a motor
  {
    init(DIR_A, PWM_A, BRAKE_A);
  }
  else if (select == 1) //option for b motor
  {
    init(DIR_B, PWM_B, BRAKE_B);
  }
  else
  {
    //throw an error
  }
}
Motor::Motor(int dirPin, int pwmPin, int brakePin)
{
  init(dirPin, pwmPin, brakePin);
}

void Motor::init(int dirPin, int pwmPin, int brakePin)
{
  pinMode(dirPin, OUTPUT);
  pinMode(pwmPin, OUTPUT);
  pinMode(brakePin, OUTPUT);
  _dirPin = dirPin;
  _pwmPin = pwmPin;
  _brakePin = brakePin;
}
void Motor::move(int speed)
{
  _speed = speed;
  if (_speed == 0)
  {
    digitalWrite(_brakePin, HIGH);
  }
  else
  {
    digitalWrite(_brakePin, LOW);
  }

  if (_speed > 0)
  {
    analogWrite(_pwmPin, _speed);
    digitalWrite(_dirPin, HIGH);
  }
  else if (_speed < 0)
  {
    analogWrite(_pwmPin, abs(speed));
    digitalWrite(_dirPin, LOW);
  }
}
void Motor::setSpeed(int speed)
{
  _speed = speed;
  if (speed > 0)
  {
    analogWrite(_pwmPin, speed);
    digitalWrite(_dirPin, HIGH);
  }
  else if (speed < 0)
  {
    analogWrite(_pwmPin, abs(speed));
    digitalWrite(_dirPin, LOW);
  }
}
void Motor::stop()
{
  digitalWrite(_brakePin, HIGH);
}
