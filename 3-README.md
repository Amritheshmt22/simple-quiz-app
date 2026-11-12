# Simple Quiz App

A small frontend quiz project with five web development questions, instant feedback and a saved best score. It is built with plain HTML, CSS and JavaScript, with no build step or external dependency.

## Features

- Five multiple-choice questions
- Instant correct or incorrect feedback
- Short explanation after each answer
- Progress bar and live score
- Final result message based on performance
- Best score saved in browser local storage
- Restart button for another attempt
- Responsive layout for desktop and mobile screens

## Files

- `index.html` - page structure and quiz panels
- `styles.css` - responsive layout, answer states and visual design
- `script.js` - question data, scoring, feedback, progress and local storage

## How to run

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Choose an answer for each question and view your final score.

No server, package install or account is required.

## How it works

The JavaScript stores questions in an array and renders one question at a time. Answer buttons update the score, show feedback and unlock the next question. When the final question is answered, the app shows the result and saves the best score in local storage.

## Testing

The project was checked in a browser with functional tests for answer selection, scoring, feedback, progress, result messages, restart behavior and saved best scores. Desktop and mobile layouts were visually inspected.

## Note

This project was built with the help of an AI assistant (Instinct) as a learning project.
