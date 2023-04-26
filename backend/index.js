require("dotenv").config();

const express = require("express");
const { Client } = require("pg");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

const {receipt} = require("./receipt");

/* Express Setup */
const app = express();
const port = 8100;

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/* MailGun Logic */
const mailgun = new Mailgun(formData);

const mailgunClient = mailgun.client({
    username: process.env.MAILGUN_USERNAME,
    key: process.env.MAILGUN_KEY,
});

const mailgunDomain = "sustainagcal.com";

/* DB Logic */
const conString = "postgres://postgres:postgres@localhost:5432/sustainag";
const client = new Client(conString);
client.connect();

/* Page serving endpoints */

/* Account related endpoints */

/* Marketplace endpoints */
app.get("/products/list", async (req, res) => {
    const outcome = await client.query("SELECT * FROM Products ORDER BY name");

    res.send(outcome.rows);
});

app.post("/products/buy", async (req, res) => {
    // Create the Order
    const orderText = "INSERT INTO Orders (first, last, email, address) VALUES ($1, $2, $3, $4) RETURNING id";
    const orderValues = [req.body.first, req.body.last, req.body.email, req.body.address];

    var outcome = await client.query(orderText, orderValues);

    const orderId = outcome.rows[0]["id"];

    const productText = "INSERT INTO ProductOrders (orderid, product) VALUES ($1, $2)"

    // Order the products
    for (var i = 0; i < req.body.products.length; i++) {
        var productValues = [orderId, req.body.products[i].id];
        var outcome = await client.query(productText, productValues);
    }

    // Send off emails
    try {
        const messageData = {
            from: "andrew@sustainagcal.com",
            to: req.body.email, 
            subject: "SustainAg Order Made",
            html: receipt(req.body)                
        };

        mailgunClient.messages.create(mailgunDomain, messageData);
    } catch (error) {
        console.log(error);
    }

    try {
        const messageData = {
            from: "andrew@sustainagcal.com",
            to: "andrewesteban1999@gmail.com", 
            subject: "SustainAg Order Made",
            html: receipt(req.body)                   
        };

        mailgunClient.messages.create(mailgunDomain, messageData);
    } catch (error) {
        console.log(error);
    }

    res.send({status: 200})
})

/* Community endpoints */
app.get("/community/list/:filter", async (req, res) => {
    // Get all posts matching filter
    const filter = req.params.filter;
    var outcome = null;

    if (filter === "All" || filter === "null") {
        outcome = await client.query(
            `SELECT Posts.id, Posts.first, Posts.last, title, COUNT(Comments.id), Posts.content
        FROM Posts LEFT JOIN Comments ON Posts.id = Comments.post
        GROUP BY (Posts.id, Posts.first, Posts.last, Posts.content, title)
        ORDER BY Posts.id DESC`
        );
    } else {
        outcome = await client.query(
            `SELECT Posts.id, Posts.first, Posts.last, title, COUNT(Comments.id), Posts.content
            FROM Posts LEFT JOIN Comments ON Posts.id = Comments.post 
            WHERE Posts.category LIKE $1
            GROUP BY (Posts.id, Posts.first, Posts.last, Posts.content, title)
            ORDER BY Posts.id DESC`,
            [filter]
        );
    }

    res.send(outcome.rows);
});

app.post("/community/post", async (req, res) => {
    var body = req.body;

    var first = body["first"];
    var last = body["last"];
    var email = body["email"];
    var title = body["title"];
    var category = body["category"];
    var content = body["content"];

    const text = "INSERT INTO Posts (first, last, email, title, content, category) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [first, last, email, title, content, category];

    outcome = await client.query(text, values);

    res.send({status: 200});
});

app.post("/community/comment", async (req, res) => {
    var body = req.body;

    var first = body["first"];
    var last = body["last"];
    var email = body["email"];
    var post = body["post"];
    var content = body["content"];

    const text = "INSERT INTO Comments (first, last, email, content, post) VALUES ($1, $2, $3, $4, $5)";
    const values = [first, last, email, content, post];

    outcome = await client.query(text, values);

    res.send({status: 200});
});

app.get("/community/post/:id", async (req, res) => {
    const id = req.params.id;
    var outcome = await client.query(`SELECT * FROM Posts WHERE id = $1`, [id]);

    var obj = {
        post: outcome.rows[0]
    }

    outcome = await client.query(`SELECT * FROM Comments WHERE post = $1 ORDER BY id ASC`, [id]);

    obj["comments"] = outcome.rows;

    res.send(obj);
});

/* Consultation endpoints */
app.get("/education/options", async (req, res) => {
    var query = await client.query("SELECT * FROM Times WHERE booking IS NULL");

    var result = {};

    for (var i = 0; i < query.rowCount; i++) {
        // values.push(query.rows[i]["time"]);
        var time = query.rows[i]["time"];
        var date =
            2023 +
            "-" +
            String(time.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(time.getDate()).padStart(2, "0");

        if (!result.hasOwnProperty(date)) {
            result[date] = [];
        }

        var exact =
            String(time.getHours()).padStart(2, "0") +
            ":" +
            String(time.getMinutes()).padStart(2, "0");

        result[date].push(exact);
    }

    res.send(result);
});

app.post("/education/schedule", async (req, res) => {
    var body = req.body;
    var first = body["first"];
    var last = body["last"];
    var email = body["email"];
    var phone = body["phone"];
    var address = body["address"];
    var products = body["products"];
    var size = body["size"];
    var date = body["date"];
    var time = body["time"];

    var cleanProducts = [];

    for (var i = 0; i < products.length; i++) {
        cleanProducts.push(products[i]["label"]);
    }

    var cleanSize = size[0]["value"];

    var cleanTime = time[0]["value"];

    const text =
        "INSERT INTO Bookings(first, last, email, phone, address, products, size) VALUES($1, $2, $3, $4, $5, $6, $7)";
    const values = [first, last, email, phone, address, cleanProducts, cleanSize];

    var outcome = await client.query(text, values);

    if (outcome.rowCount !== 1) {
        res.sendStatus(300);
        return;
    }

    const textId = "SELECT id from Bookings WHERE email LIKE $1";
    const valuesId = [email];

    outcome = await client.query(textId, valuesId);

    const id = outcome.rows[0]["id"];

    var newDate = new Date(date);
    newDate.setHours(parseInt(cleanTime.substring(0, 2)));
    newDate.setMinutes(parseInt(cleanTime.substring(3, 5)));
    newDate.setSeconds(0);

    const textIdTime = "SELECT id FROM Times WHERE time = $1";
    const valuesIdTime = [newDate];

    outcome = await client.query(textIdTime, valuesIdTime);

    if (outcome.rowCount !== 1) {
        res.sendStatus(300);
        return;
    }

    const timeId = outcome.rows[0]["id"];

    const textSetBooking = "UPDATE Times SET booking = $1 WHERE id = $2";
    const valuesSetBooking = [id, timeId];

    outcome = await client.query(textSetBooking, valuesSetBooking);

    if (outcome.rowCount !== 1) {
        res.sendStatus(300);
        return;
    }

    const monthName = newDate.toLocaleString("en-US", { month: "long" });
    const dayInMonth = newDate.getDate();

    try {
        const messageData = {
            from: "andrew@sustainagcal.com",
            to: email, 
            subject: "Hello from SustainAg",
            html:
                `<p>
            Hi ` +
                first +
                `, <br><br>
        
            You have scheduled an initial consultation with our support team on<br>
        </p>
        
        <table border="0" cellpadding="0" cellspacing="0" width="160" style="background-color:#FFFFFF; border:1px solid #CCCCCC; margin-left: auto; margin-right: auto;">
            <tr>
                <td align="left" valign="top" style="padding:5px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td align="center" valign="top" style="background-color:#2C9AB7; color:#FFFFFF; font-family:Helvetica, Arial, sans-serif; font-size:16px; font-weight:bold; padding-top:10px; padding-bottom:10px; text-align:center;">
                                ` +
                monthName +
                `
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" style="color:#2C9AB7; font-family:Helvetica, Arial, sans-serif; font-size:60px; font-weight:bold; line-height:100%; padding-top:20px; padding-bottom:5px; text-align:center;">
                                ` +
                dayInMonth +
                `
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" style="color:#2C9AB7; font-family:Helvetica, Arial, sans-serif; font-size:20px; font-weight:bold; line-height:100%; padding-top:5px; padding-bottom:10px; text-align:center;">
                                ` +
                cleanTime +
                `
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        
        <br>
        <p>
            If you want to reschedule your consultation, call <a href="tel:+15301234567">+1 (530) 123-4567</a>.<br><br>
        
            We look forward to helping you Go Green! <br><br><br>
        
            Andrew @ SustainAg
        </p>`,
        };

        mailgunClient.messages.create(mailgunDomain, messageData);
    } catch (error) {
        console.log(error);
    }

    res.sendStatus(200);
});

/* Newsletter endpoints */
app.post("/newsletter", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
