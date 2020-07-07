# Spaced Repetition Quiz

![Build Status](https://img.shields.io/badge/build-passing-green.svg)

## Table of Content

- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)

## Description

Coding quiz based on spaced repetition algorithm allowing users to get focus more on harder concepts by getting more time if they answer the questions wrong.
Powered by MERN stack.

![Screenshot](images/algorithm.png 'algorithm')

## Installation

Git clone and run the following command:

```
    npm install
```

## Usage

Setting up data in mongodb: 
1.  Open shell and run 'mongod'.
2.  Open another shell and cd '\spaced-repetition-quiz\client\src\utils\data'.
3.  Run 'mongoimport --jsonArray --db questions --collection questions --file questions.json' command.

```
    npm run start
```

![Screenshot](images/homeScreen.png 'Home')

<img src="https://avatars0.githubusercontent.com/u/28842469?v=4" width ="50px" height="50px"> 
