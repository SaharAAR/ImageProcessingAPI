# Image Processing API

This project is an Image Processing API built using Node.js and Express. Created by Sahar R. 


## Installation & Scripts --------------

To install the dependencies, run:

`bash
npm install

- To start the server:

`bash
npm start

- To run tests using Jasmine

`bash
npm test 



## Endpoints --------------

Endpoint: `GET /images`
Params:

- `filename`: Name of the image file (without extension)
- `width`: Width of the resized image
- `height`: Height of the resized image

Example:

http://localhost:3000/images/?filename=artist&height=600&width=600

Example:

http://localhost:3000/images/?filename=artwork&height=500&width=500


## Dependencies Used --------------

`ts
"devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.5",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "eslint": "^8.56.0",
    "jasmine": "^5.1.0",
    "prettier": "^3.1.1"
  },
"dependencies": {
    "express": "^4.18.2",
    "sharp": "^0.33.1",
    "typescript": "^5.3.3"
  },