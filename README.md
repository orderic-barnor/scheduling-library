# Scheduling Library

A JavaScript library for defining weekly schedules, either using a table interface or a period interface.

## Installation

To install the library, clone the repository and install the dependencies:

```sh
git clone https://github.com/orderic-barnor/scheduling-library.git
cd scheduling-library
npm install
```


## Usage

To start the development server and test the library:

```sh
npm start
```

Open your browser and navigate to `http://localhost:8080` to see the examples.

## Example

In your HTML file, include the library and initialize it:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scheduling Library Example</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <button id="open-modal">Open Scheduling Modal</button>
    <script src="app.js" type="module"></script>
</body>
</html>
```

In your JavaScript file:

```js
import SchedulingLibrary from './src/index.js';

const scheduleLibrary = new SchedulingLibrary();
scheduleLibrary.init();

document.getElementById('open-modal').onclick = () => {
    const selectedInterface = prompt("Enter 'table' for Table Interface or 'period' for Period Interface:");
    scheduleLibrary.open(selectedInterface);
};

document.addEventListener('scheduleSaved', (event) => {
    console.log('Schedule saved:', event.detail);
});
```
```

Avec cette structure, vous pouvez facilement gérer et tester votre bibliothèque depuis GitHub. Pour démarrer le projet, exécutez simplement `npm start` et accédez à `http://localhost:8080` pour voir les exemples en action.