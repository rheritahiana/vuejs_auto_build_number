# vuejs_auto_build_number
A few hacks to generate build number and inject it in vuejs App
//this requires that you install   https://www.npmjs.com/package/build-number-generator with "npm i -D build-number-generator --save"
// content of generate-build-id.js in the root of the project
var fs = require("fs");
const { generate, validate, parse, format } = require("build-number-generator");
const time = generate();
console.log(time);
console.log("Incrementing build number...");
fs.readFile("src/metadata.json", function (err, content) {
  if (err) throw err;
  var metadata = JSON.parse(content);
  metadata.version = metadata.version + 1;
  metadata.time = time;
  metadata.build = ((metadata.version) + "-" + time).toString();
  metadata.date = format(time);
  fs.writeFile("src/metadata.json", JSON.stringify(metadata), function (err) {
    if (err) throw err;
    console.log(metadata);
  });
});

// content of /src/metadata.json
{
  "time": "200722325",
  "build": "1-200722325",
  "version": 1,
  "date": "Wed Jul 22 2020 10:50"
}

// A few things to modify in package.json
 "scripts": {
        "serve": "vue-cli-service serve",
        "build": "node generate-build-id.js && vue-cli-service build", ///here
        "lint": "vue-cli-service lint"
    },
    
//Now in any component 
//Import the json file 
import metadata from "@/metadata.json";

//  create a metadata objet in data
  data: () => ({
    metadata: {
      time: "",
      build: "",
      version: "",
      date: "",
    },  
  }),
  
 // in template
   <div>
          <div>Version</div>
          <div>{{ metadata.build }}</div>
          <div>Date</div>
          <div>{{ metadata.date }}</div>
    </div>
    
    //that's it. Thank you. Any suggestion is welcome 
