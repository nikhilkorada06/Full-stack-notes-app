
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

// Use environment variables instead of hardcoding
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to Database:', err);
        return;
    }
    console.log('Connected to Database Successfully');
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM todoItems;', (error, result) => {
        if (error) {
            console.error('Error Fetching Items:', error);
            res.status(500).send('Error fetching items');
            return;
        }
        res.json(result);
    });
});

app.post('/add-item', (req, res) => {
    db.query('INSERT INTO todoItems(itemDescription) VALUES (?);', [req.body.text], (error, result) => {
        if (error) {
            console.error('Error Inserting Item:', error);
            res.status(500).send('Error inserting item');
            return;
        }
        res.send('Item added successfully');
    });
});

app.put('/edit-item', (req, res) => {
    db.query('UPDATE todoItems SET itemDescription = ? WHERE ID = ?;', [req.body.itemDescription, req.body.ID], (error, result) => {
        if (error) {
            console.error('Error Updating Item:', error);
            res.status(500).send('Error updating item');
            return;
        }
        res.send('Item updated successfully');
    });
});

app.delete('/delete-item', (req, res) => {
    db.query('DELETE FROM todoItems WHERE ID = ?;', [req.body.ID], (error, result) => {
        if (error) {
            console.error('Error Deleting Item:', error);
            res.status(500).send('Error deleting item');
            return;
        }
        res.send('Item deleted successfully');
    });
});

// IMPORTANT: Use Render's dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});





// const express = require('express');
// const cors = require('cors');
// const app = express();

// const mysql = require('mysql2');
// const e = require('express');

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     host: 'localhost',
//     user:'root',
//     password: '06122005@Nikhil',
//     database: 'todo'
// })

// db.connect((err) => {
//     if(err) {
//         console.log('Error Connection to Database : ', err); 
//         return    
//     } 
//     console.log('Connected to Database Successfully');
// });

// app.get('/', (req, res) => {
//     console.log("Deafult Route");

//     db.query('select * from todoItems;', (error, result) => {
//         if(error){
//             console.log('Error Fetching Items : ', error);
//             return;
//         }
//         console.log('Data : ', result);

//         res.send(result);
//     });
// });

// app.post('/add-item', (req, res) => {
//     console.log(req.body);

//     db.query(`insert into todoItems(itemDescription) values('${req.body.text}');`, (error, result) => {
//         if(error){
//             console.log('Error Inserting Item : ', error);
//             return;
//         }
//         console.log('Item Inserted Successfully : ', result);
//     });

//     res.send('Item added successfully');
// });

// app.put('/edit-item', (req, res)=>{
//     db.query(`update todoItems set itemDescription ='${req.body.itemDescription}' where ID = '${req.body.ID}';`, (error, result) => {
//         if(error){
//             console.log('Error Updating Item : ', error);
//             return;
//         }
//         console.log('Item Updated Successfully : ', result);
//     });

//     res.send('Item updated successfully');
// })

// app.delete('/delete-item', (req, res) => {
//     console.log("Delete Request Body :", req.body);
//     db.query('delete from todoItems where ID = ?;', [req.body.ID], (error, result) => {
//         if (error) {
//             console.log('Error Deleting Item : ', error);
//             res.status(500).send('Error deleting item');
//             return;
//         }
//         console.log('Item Deleted Successfully : ', result);
//         res.send('Item deleted successfully');
//     });
// });

// app.listen(3000, ()=> {
//     console.log("Server Started Running on Port 3000"); 
// })
