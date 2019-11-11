const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'));
app.use('/static',express.static('public'));

app.get('*',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});

app.listen(7000, function(){
    console.log('7000')
})

