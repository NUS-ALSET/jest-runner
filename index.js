const jest = require("jest");
const fs = require('fs');
    

exports.handler = function(event, context, callback) {

 
  if (event.httpMethod == "GET"){
    
    // Read in text for index.html.
    let html = fs.readFileSync(__dirname + '/index.html', 'utf8');
    //console.log(html); 
    
    let result = {
      "isBase64Encoded": false,
      "statusCode": 200,
      "headers": {"content-type": "text/html"},
      "body": html}
      
    callback(null, result);
    
  } else {
    // Get files to update from the event object. 
    // Update the contents of the files. 
    // Execute jest programatically
    // Return jest results.
    
    // Look for locally passed files.
    let body = JSON.parse(event.body);

    //console.log(body.files);
    for (file in body.files){
      console.log(file);
      if(file != "data1.txt"){
        fs.writeFileSync('/tmp/'+file , body.files[file]);
      } else {
        console.log("Not handling zip files encoded in data1.txt yet.")
      }
    }
    
    console.log('Running index.handler');
    console.log('==================================');
    console.log('event', event);
    console.log('==================================');
  
    const options = {
      projects: [__dirname], 
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
          "headers": {"content-type": "application/json"},
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
