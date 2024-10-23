var express = require("express");
var app = express();
app.get('/',(req,res) =>{
    res.send('Test LVTN Bùi Tuấn Tú');
})

app.listen(3000,  () => console.log('listen on port 3000'))

