#ifndef Motor_h
#define Motor_h

#include "Arduino.h"



class Motor
{
  public:
    Motor(int dirPin, int pwmPin, int brakePin);
    Motor(int select);
    void init(int dirPin, int pwmPin, int brakePin);
    void move(int speed);
    void setSpeed(int speed);
    void stop();
    //int getCurrent();
    static const int PWM_A = 3,
    DIR_A   = 12,
    BRAKE_A = 9,
    SNS_A   = 0,
    PWM_B = 11,
    DIR_B = 13,
    BRAKE_B = 8,
    SNS_B = 1,
    MOTOR_A = 0,
    MOTOR_B = 1;
  private:
    int _currentConsump,
    _speed,
    _dirPin,
    _pwmPin,
    _brakePin;
};
#endif
