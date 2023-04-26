const { Client } = require("pg");

function dateFromDay(day) {
    const date = new Date();
    date.setFullYear(new Date().getFullYear(), 0, day);
    return date;
}

function dayFromDate(date) {
    return (
        (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
            Date.UTC(date.getFullYear(), 0, 0)) /
        24 /
        60 /
        60 /
        1000
    );
}

async function reset() {
    const conString = "postgres://postgres:postgres@localhost:5432/sustainag";
    const client = new Client(conString);
    client.connect();

    await client.query("DROP TABLE IF EXISTS Times");
    await client.query("DROP TABLE IF EXISTS Bookings");
    await client.query("DROP TABLE IF EXISTS Orders");
    await client.query("DROP TABLE IF EXISTS ProductOrders");
    await client.query("DROP TABLE IF EXISTS Comments");
    await client.query("DROP TABLE IF EXISTS Posts");
    await client.query("DROP TABLE IF EXISTS Products");

    await client.query(`CREATE TABLE Bookings (
        id SERIAL PRIMARY KEY,
        first VARCHAR(100) NOT NULL,
        last VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        address VARCHAR(200) NOT NULL,
        products VARCHAR(300) NOT NULL,
        size VARCHAR(10) NOT NULL
    )`);

    await client.query(`CREATE TABLE Times (
        id SERIAL,
        time TIMESTAMP UNIQUE NOT NULL,
        booking INT,
        CONSTRAINT FK_employee_department FOREIGN KEY(booking) REFERENCES Bookings(id) 
    )`);

    await client.query(`CREATE TABLE Posts (
        id SERIAL UNIQUE,
        first VARCHAR(100) NOT NULL,
        last VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        title VARCHAR(150) NOT NULL,
        content VARCHAR(1000) NOT NULL,
        category VARCHAR(100) NOT NULL
    )`);

    await client.query(`CREATE TABLE Comments (
        id SERIAL UNIQUE,
        first VARCHAR(100) NOT NULL,
        last VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        content VARCHAR(1000) NOT NULL,
        post INT,
        CONSTRAINT FK_post_key FOREIGN KEY(post) REFERENCES Posts(id) 
    )`);

    await client.query(`CREATE TABLE Products (
        id SERIAL UNIQUE,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        image VARCHAR(1000) NOT NULL,
        cost REAL NOT NULL,
        category VARCHAR(20) NOT NULL
    )`);

    await client.query(`CREATE TABLE Orders (
        id SERIAL UNIQUE,
        first VARCHAR(100) NOT NULL,
        last VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        address VARCHAR(256) NOT NULL
    )`);

    await client.query(`CREATE TABLE ProductOrders (
        id SERIAL,
        orderid INT NOT NULL,
        product INT NOT NULL,
        CONSTRAINT FK_order_key FOREIGN KEY(orderid) REFERENCES Orders(id),
        CONSTRAINT FK_product_key FOREIGN KEY(product) REFERENCES Products(id) 
    )`);

    const productText =
        "INSERT INTO Products (name, description, image, cost, category) VALUES ($1, $2, $3, $4, $5)";

    const productValues = [
        [
            "Dr Earth",
            "Organic Fertilizers for Leafy Greens.",
            "https://m.media-amazon.com/images/I/61kNKGeiBcL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            20.5,
            "Fertilizers"
        ],
        [
            "Dr Earth (10x)",
            "Organic Fertilizers for Leafy Greens.",
            "https://m.media-amazon.com/images/I/61kNKGeiBcL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            200,
            "Fertilizers"
        ],
        [
            "Wiggle Worm",
            "Organic Fertilizers targetting vegetables.",
            "https://i5.walmartimages.com/asr/97c5f103-70e4-4bd8-a85e-2146ecdbe93e.8bc609ff3dc9f9f197564ad45437e137.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
            18,
            "Fertilizers"
        ],
        [
            "Orgo Neem Cake",
            "Neem based organic soil Fertilizers.",
            "https://m.media-amazon.com/images/I/71JzfcZYyOL._SX522_.jpg",
            25.10,
            "Fertilizers"
        ],
        [
            "Orgo Neem Cake (20x)",
            "Neem based organic soil Fertilizers.",
            "https://m.media-amazon.com/images/I/71JzfcZYyOL._SX522_.jpg",
            500,
            "Fertilizers"
        ],
        [
            "Old Farmers Almanac",
            "Tomato organic food and Fertilizers.",
            "https://i5.walmartimages.com/asr/241c0a39-b515-4e68-a806-4c512515d87f.edb77f02456bfa33130dd4ba1861a3ab.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
            16.50,
            "Fertilizers"
        ],
        [
            "Monterey Pesticides",
            "70% Neem-based Pesticides.",
            "https://static.wixstatic.com/media/e24d40_61e8b2f324c14aa7914232d53a11a783~mv2_d_1200_1800_s_2.jpg/v1/fill/w_640,h_960,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e24d40_61e8b2f324c14aa7914232d53a11a783~mv2_d_1200_1800_s_2.jpg",
            41.20,
            "Pesticides"
        ],
        [
            "Monterey Pesticides (2L)",
            "70% Neem-based Pesticides.",
            "https://static.wixstatic.com/media/e24d40_61e8b2f324c14aa7914232d53a11a783~mv2_d_1200_1800_s_2.jpg/v1/fill/w_640,h_960,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e24d40_61e8b2f324c14aa7914232d53a11a783~mv2_d_1200_1800_s_2.jpg",
            82.0,
            "Pesticides"
        ],
        [
            "Monterey Pesticides (3L)",
            "70% Neem-based Pesticides.",
            "https://static.wixstatic.com/media/e24d40_61e8b2f324c14aa7914232d53a11a783~mv2_d_1200_1800_s_2.jpg/v1/fill/w_640,h_960,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e24d40_61e8b2f324c14aa7914232d53a11a783~mv2_d_1200_1800_s_2.jpg",
            100.40,
            "Pesticides"
        ],
        [
            "All Seasons Spray",
            "Horticultural oil spray.",
            "https://www.thespruce.com/thmb/MWImglnavPcHeWbu4JGc9mGsWgM=/fit-in/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/BonideAllSeasonsHorticulturalandDormantSprayOil-0b9451685db94cd3bd3572e073bb8057.jpg",
            40.90,
            "Pesticides"
        ],
        [
            "Natria Neem Oil",
            "40% Neem-based spray.",
            "https://www.thespruce.com/thmb/XTz60qeIznNpnMUdJsb4-AKmvBk=/fit-in/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/NatriaNeemOilSpray-0afeac908e1b40839b7505e12916f2f2.jpg",
            39.50,
            "Pesticides"
        ],
        [
            "Natria Neem Oil (5L)",
            "40% Neem-based spray.",
            "https://www.thespruce.com/thmb/XTz60qeIznNpnMUdJsb4-AKmvBk=/fit-in/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/NatriaNeemOilSpray-0afeac908e1b40839b7505e12916f2f2.jpg",
            190.50,
            "Pesticides"
        ],
        [
            "Avenger Weed Killer",
            "Tested on vegetables and leafy greens.",
            "https://cdn.shopify.com/s/files/1/0061/1391/9089/products/oid-comm-avenger-weed-killer-concentrate-1-gallon.jpg?v=1636693906",
            25,
            "Herbicides"
        ],
        [
            "Green Gobbler",
            "Tested on tomatoes.",
            "https://m.media-amazon.com/images/I/41Mu8j7xgnL._SX342_SY445_QL70_FMwebp_.jpg",
            25.50,
            "Herbicides"
        ],
    ];

    for (var p = 0; p < productValues.length; p++) {
        await client.query(productText, productValues[p]);
    }

    const postText =
        "INSERT INTO Posts (first, last, email, title, content, category) VALUES ($1, $2, $3, $4, $5, $6)";

    const posts = [
        [
            "Andrew",
            "Esteban",
            "andrewesteban1999@gmail.com",
            "Good Sustainable Pesticidess for Leafy Greens",
            "I've been researching possible alternatives to Garden Tech Sevin 5% Dust Bug Killer but so far I haven't found anything I think provides a good cost-benefit ratio. Does anyone have any suggestions on the matter?",
            "Pesticides",
        ],
        [
            "Malena",
            "Buffagni",
            "malena@gmail.com",
            "Smart Weather Systems",
            "Can anyone recommend a good smart weather system that monitors soil health and UV levels?",
            "Technology",
        ],
    ];

    for (var p = 0; p < posts.length; p++) {
        await client.query(postText, posts[p]);
    }

    const commentText =
        "INSERT INTO Comments (first, last, email, content, post) VALUES ($1, $2, $3, $4, $5)";

    const comments = [
        [
            "Malena",
            "Buffagni",
            "malena@gmail.com",
            "I've found Spectracide Triazicide to be fairly good, but I'm not convinced as to it's sustainability",
            1,
        ],
        [
            "Andrew",
            "Esteban",
            "andrew@gmail.com",
            "Great thanks, I'll do my own research into that to see what I find",
            1,
        ],
    ];

    for (var p = 0; p < comments.length; p++) {
        await client.query(commentText, comments[p]);
    }

    var today = new Date();
    date = dayFromDate(today);

    for (var i = date + 1; i < date + 100 && i < 365; i++) {
        var newDate = dateFromDay(i);
        var day = newDate.getDate();
        var month = newDate.getMonth() + 1;

        day = String(day).padStart(2, "0");
        month = String(month).padStart(2, "0");

        var times = [
            "09:00:00",
            "09:30:00",
            "10:00:00",
            "10:30:00",
            "11:00:00",
            "11:30:00",
            "12:00:00",
            "12:30:00",
            "13:00:00",
            "13:30:00",
            "14:00:00",
            "14:30:00",
            "15:00:00",
            "15:30:00",
            "16:00:00",
            "16:30:00",
        ];

        for (var j = 0; j < times.length; j++) {
            await client.query(
                `INSERT INTO Times (time) VALUES('2023-` + month + `-` + day + ` ` + times[j] + `')`
            );
        }
    }

    client.end();
}

reset();
