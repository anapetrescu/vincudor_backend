async function getQuality(details){
return new Promise(function(resolve, reject){
    var spawn = require("child_process").spawn; 
    const pythonProcess = spawn('python',["quality_prediction/wine_quality.py",
                            parseFloat(details.fixed_acidity),
                            parseFloat(details.volatile_acidity),    
                            parseFloat(details.citric_acid),         
                            parseFloat(details.residual_sugar),      
                            parseFloat(details.chlorides),           
                            parseFloat(details.free_sulfur_dioxide), 
                            parseFloat(details.total_sulfur_dioxide),
                            parseFloat(details.density),             
                            parseFloat(details.pH),                  
                            parseFloat(details.sulphates),           
                            parseFloat(details.alcohol)]);
    pythonProcess.stdout.on('data', function(data) {
        resolve(data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
        console.log('ceva')
        resolve(data.toString());
    });
    })
}

module.exports.getQuality = getQuality;