const express = require('express');
const dotenv = require('dotenv');
const mssql = require('mssql');
const console = require('console');
const { Error } = require('globalthis/implementation');
const app = express();

dotenv.config()

const config = {
    driver: process.env.SQL_DRIVER,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_UID,
    password: process.env.SQL_PWD,
    options: {
        encrypt: true,
        enableArithAbort: false
    },
};

const pool = new mssql.ConnectionPool(config, (err) => {console.log(err)});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(process.env.PORT, () => {
    console.log(`Server started running on ${process.env.PORT} for ${process.env.NODE_ENV}`);
    console.log('listening...')
});
app.get('/', (req, res) => {
    res.send('?? Teaming up with NodeJS and SQL Server');
});

app.get('/policyBreakdown', async (req, res) => {
    try {
        const parsedReq = {
            source:  req.body.source ?? '',
            state: req.body.state ?? '',
            policyNumber: req.body.policyNumber ?? '',
            type: req.body.type ?? '',
            insuredName: req.body.insuredName ?? '',
            mode: req.body.mode ?? ''
        }
        const connection = await pool.connect()
        const result = await connection.request()
            .input("Source", parsedReq.source)
            .input("State", parsedReq.state)
            .input("PolicyNumber", parsedReq.policyNumber)
            .input("Type", parsedReq.type)
            .input("InsuredName", parsedReq.insuredName)
            .input("Mode", parsedReq.mode)
            .execute('getPolicyBreakdown')
        res.json({records: result.recordsets})
    } catch (err) {
        res.status(500).json(err)
    }
});

app.get('/bundle', function(req, res) {
    console.log("GET From SERVER");
    //connect to server
    res.send(bundle);
});

// app.post('/upload', function(req, res) {
//     console.log(req.body);
//     const file = 'Some stuff happens'
//     await pool.connect()
//     const fileheaders = SOMEDEP.getheaders(req.body.file)
//     const newTable = await pool.request
//     .input('Code', req.body.Code)
//     .input('Salary', req.body.Salary)
//     .input('Job', req.body.Job)
//     .input('Department', req.body.Department)
//     .input('Name', req.body.Name)
//     .query(`
//         CREATE TABLE ${parsed}
//     `);
//     const result = await pool.request()
//         .input("File", file)
//         .input("Carrier", req.body.carrier)
//         .execute('upload')
//         const commissions = result.recordset
//     res.json(commissions)
//     //connect to server
//     //req is file, parse and load database
//     //return items loaded into table with ids
//     res.status(200).send("Successfully posted commisions");
// });

app.patch('/commisions/:uid', function(req, res) {
    var policy = req.body;
    const { uid } = req.params;
    console.log(req.body);
    //connect to server
    res.status(200).send(`Successfully patched commision ${id}`);
});


app.listen(6069);