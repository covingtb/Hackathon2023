# Authors: Brenden Covington, Mandy Sumner, Sonja Lavin
# Githubs: covingtb,
# Date started: 5/19/2023
# Description:

from flask import Flask, render_template, request
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/roll_dice', methods=['POST'])
def roll_dice():
    num_dice = int(request.form['numDice'])
    roll_results = []

    for _ in range(num_dice):
        roll_result = random.randint(1, 6)
        roll_results.append(roll_result)

    return render_template('index.html', results=roll_results)

if __name__ == '__main__':
    app.run(debug=True)

