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
