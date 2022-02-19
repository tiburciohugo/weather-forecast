const weather = require('./weather');

// Join multiple value passed as arguments and replace all spaces with underscores
// const query = process.argv.slice(2).join('_').replace('', '_');
const location = process.argv.slice(2).join('_').replace(' ', '_');
//query: 90201
//query: Cleveland_OH
//query: London_England
weather.get(location);