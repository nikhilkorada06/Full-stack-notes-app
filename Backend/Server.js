const express = require('express');
const cors = require('cors');
const app = express();

const mysql = require('mysql2');
const e = require('express');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '06122005@Nikhil',
    database: 'todo'
})

db.connect((err) => {
    if(err) {
        console.log('Error Connection to Database : ', err); 
        return    
    } 
    console.log('Connected to Database Successfully');
});

app.get('/', (req, res) => {
    console.log("Deafult Route");

    db.query('select * from todoItems;', (error, result) => {
        if(error){
            console.log('Error Fetching Items : ', error);
            return;
        }
        console.log('Data : ', result);

        res.send(result);
    });
});

app.post('/add-item', (req, res) => {
    console.log(req.body);

    db.query(`insert into todoItems(itemDescription) values('${req.body.text}');`, (error, result) => {
        if(error){
            console.log('Error Inserting Item : ', error);
            return;
        }
        console.log('Item Inserted Successfully : ', result);
    });

    res.send('Item added successfully');
});

app.put('/edit-item', (req, res)=>{
    db.query(`update todoItems set itemDescription ='${req.body.itemDescription}' where ID = '${req.body.ID}';`, (error, result) => {
        if(error){
            console.log('Error Updating Item : ', error);
            return;
        }
        console.log('Item Updated Successfully : ', result);
    });

    res.send('Item updated successfully');
})

app.listen(3000, ()=> {
    console.log("Server Started Running on Port 3000"); 
})