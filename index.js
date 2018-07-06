// For development/testing purposes
const jest = require("jest");

var html = `<html>
<body>
<h1>Enter test code</h1>
</body>
</html>`

let testContent = `
var greetings = require("./index");

describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
      expect(2 + 2).toBe(5);
    });
  });

describe('Greeting', () => {
  it('knows that hello returns HELLO', () => {
    expect( greetings.hello() ).toBe("HELLO");
  });
});
`
let solutionContent = `
exports.hello = function() {
  return "HELLO";
}
`

exports.handler = function(event, context, callback) {

  // Get files to update from the event object. 
  // Update the contents of the files. 
  // Execute jest programatically
  // Return jest results. 
  if (event.httpMethod != "GET"){
    
    let result = {
      "isBase64Encoded": false,
      "statusCode": 200,
      "headers": {"content-type": "text/html"},
      "body": html}
      
    callback(null, result);
    
  } else {

    var fs = require('fs');
    fs.writeFileSync('/tmp/index.spec.js', testContent);
    fs.writeFileSync('/tmp/index.js', solutionContent);

    console.log('Running index.handler');
    console.log('==================================');
    console.log('event', event);
    console.log('==================================');
  
    const options = {
      projects: [__dirname], //['/tmp'] need to run jest in /tmp file rather than locally. 
      silent: true,
    };
    
    jest
      .runCLI(options, options.projects)
      .then((success) => {
        console.log("***********");
        console.log(success.results.numFailedTests);
        console.log('Stopping index.handler');
      
        let result = {
          "isBase64Encoded": false,
          "statusCode": 200,
          "headers": {"content-type": "text/html"},//"application/json"},
          "body": JSON.stringify(success)
          }
          
        callback(null, result);
      
      })
      .catch((failure) => {
        console.log("****** In the error handler code. *******")
        console.error(failure);
        let result = {
          "isBase64Encoded": false,
          "statusCode": 200,
          "headers": {"content-type": "text/html"},//"application/json"},
          "body": JSON.stringify(failure)
          }
        callback(null, result);
      });
    
      let result = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {"content-type": "text/html"},//"application/json"},
        "body": "Not waiting to return"
        }
      setTimeout(function() {
        callback(null, result);
      
        }, 15000);
      
    
  // in POST
 
  }

  
  
  // or
  // callback( 'some error type' );
};
