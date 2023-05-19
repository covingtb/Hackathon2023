# Authors: Brenden Covington, Mandy Sumner, Sonja Lavin
# Githubs: covingtb,
# Date started: 5/19/2023
# Description:

import random

def roll_dice(num_dice):
    for _ in range(num_dice):
        roll_result = random.randint(1, 6)
        print("You rolled:", roll_result)

while True:
    num_dice = int(input("Enter the number of dice to roll (0 to exit): "))
    if num_dice == 0:
        break
    roll_dice(num_dice)

