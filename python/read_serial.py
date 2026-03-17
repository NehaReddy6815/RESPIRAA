import serial

ser = serial.Serial('COM3', 9600)  # change COM if needed

while True:
    data = ser.readline().decode().strip()
    print(data)