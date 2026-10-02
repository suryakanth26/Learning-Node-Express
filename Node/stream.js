const fs = require('fs')

readstream=fs.createReadStream('./hugeData.txt','utf8')

writestream=fs.createWriteStream('./copyHugeData.txt')

// readstream.on('data',(buffer) => {
//     if(err){console.log(err.message);}
//     writestream.write(buffer);
// })

readstream.pipe(writestream)