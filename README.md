# Pepper Bot
![](https://media.giphy.com/media/Vfie0DJryAde8/giphy.gif)

## What is this?
My cat pokes Android apps to make sure they work.

If you want more than poking, why are you asking my cat? Go ask http://appium.io/ or something.

## Why?
I want to hit our web views once a minute (during work hours) to ensure we have consistent metrics. This lets us quantify performance changes easily.

## Getting Started
`git clone` then `yarn`. Customize the `src/models/constants.ts`, then run one of the scripts like `yarn turn-off-screen` or `yarn turn-on-screen`.

### Why is the `out` directory source controlled?
Because I run this on a raspberry pi zero w, which takes _forever_ to do anything. So I compile, commit, pull, and do a simple `pm2 start out/run-on-schedule.js`.
