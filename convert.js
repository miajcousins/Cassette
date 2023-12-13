"use strict";

const fs = require('fs');
//stores the contents of the csv file in a variable
const data = fs.readFileSync('movie_metadata_subset.csv');

//splits the data into an array of separate lines 
const dataArray = data.toString().split("\n");

let result = [];

//creates an array to store the headers from the first row in the file
let headers = dataArray[0].split(",");

for (let i = 1; i < dataArray.length; i++) {
    let jsonObject = {};
    //selects the first row of actual data in the file
    let currentRow = dataArray[i];
    let properties = currentRow.split(",");

    for (let x in headers) {
        //for each header, sets the corresponding property value
        jsonObject[headers[x].trim()] = properties[x].trim();
    }

    //adds the object to the main array storing all the objects 
    result.push(jsonObject);
}

//writes the end result to a json file in a compatible format
let formattedResult = JSON.stringify(result, null, 3);
fs.writeFileSync('movie_metadata_subset.json', formattedResult);