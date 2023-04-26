import React, { useState, useEffect } from "react";

import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Banner from "./Banner";
import { Button, Grid } from "@mui/material";

import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/Delete";

function ProductCard(props) {
    const product = props.product;
    const setCart = props.setCart;
    const setNum = props.setNum;
    const setCost = props.setCost;
    const cost = props.cost;
    const num = props.num;
    const cart = props.cart;

    const handleAdd = (product) => {
        setCost(cost + product.cost);
        setNum(num + 1);
        setCart([...cart, product]);
    };

    return (
        <Card
            sx={{
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                maxWidth: "100%",
            }}
        >
            <CardMedia sx={{ height: "45%" }} image={product.image} title={product.name} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                    ${Math.floor(product.cost / 1)}.
                    {String(product.cost % 1)
                        .substring(2)
                        .padEnd(2, "0")
                        .substring(0, 2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ mt: "auto" }}>
                <Button size="small" onClick={() => handleAdd(product)}>
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
}

export default function Marketplace() {
    const [cost, setCost] = useState(0);
    const [num, setNum] = useState(0);
    const [cart, setCart] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filter, setFilter] = useState("All");
    const [open, setOpen] = useState(false);

    const getProducts = () => {
        axios.get("http://localhost:8100/products/list").then((res) => {
            setAllProducts(res.data);
        });
    };

    useEffect(getProducts, []);

    const handleClickOpen = () => {
        if (num > 0) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseBuy = () => {
        const first = document.getElementById("first").value;
        const last = document.getElementById("last").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const cardNum = document.getElementById("card").value;
        const expiry = document.getElementById("date").value;
        const csv = document.getElementById("csv").value;
        const products = cart;

        const obj = {
            first: first,
            last: last,
            email: email,
            address: address,
            cardNum: cardNum,
            expiry: expiry,
            csv: csv,
            products: products,
        };

        axios.post("http://localhost:8100/products/buy", obj).then((res) => {
            setOpen(false);
            setCart([]);
            setNum(0);
            setCost(0);
        });
    };

    return (
        <>
            {/* Banner */}
            <Banner />

            <div style={{ textAlign: "right", paddingTop: "3vh", paddingRight: "2vw" }}>
                <Button onClick={handleClickOpen}>
                    <Badge badgeContent={num} color="primary" style={{ marginRight: "1vw" }}>
                        <ShoppingCartIcon />
                    </Badge>
                    ${Math.floor(cost / 1)}.
                    {String(cost % 1)
                        .substring(2)
                        .padEnd(2, "0")
                        .substring(0, 2)}
                </Button>
            </div>

            <h1 style={{ textAlign: "center", marginTop: "-2vh" }}>Sustainable Products</h1>

            <div
                style={{
                    backgroundColor: "#F4F4F4",
                    marginTop: "5vh",
                    paddingLeft: "2vw",
                    paddingRight: "2vw",
                    paddingTop: "1vh",
                    paddingBottom: "1vh",
                    marginBottom: "2vh",
                }}
            >
                <div>
                    <table
                        style={{
                            width: "100%",
                            minWidth: "100%",
                            tableLayout: "fixed",
                            textAlign: "center",
                        }}
                    >
                        <tbody>
                            <tr>
                                <td>
                                    <Button
                                        style={{ color: "black" }}
                                        onClick={() => setFilter("All")}
                                    >
                                        All
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        style={{ color: "black" }}
                                        onClick={() => setFilter("Fertilizers")}
                                    >
                                        Fertilizers
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        style={{ color: "black" }}
                                        onClick={() => setFilter("Pesticides")}
                                    >
                                        Pesticides
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        style={{ color: "black" }}
                                        onClick={() => setFilter("Herbicides")}
                                    >
                                        Herbicides
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Grid container spacing={2} style={{ marginBottom: "5vh" }}>
                {allProducts
                    .filter((product) => filter === "All" || filter === product.category)
                    .map((product, id) => (
                        <Grid item xs={3} id={id} key={id}>
                            <ProductCard
                                product={product}
                                id={id}
                                key={id}
                                setCart={setCart}
                                setNum={setNum}
                                setCost={setCost}
                                cart={cart}
                                num={num}
                                cost={cost}
                            />
                        </Grid>
                    ))}
            </Grid>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Finalise Purchase</DialogTitle>
                <DialogContent>
                    <strong>Cart</strong> <br></br>
                    {cart.sort((a, b) => a.name.localeCompare(b.name)).map((product) => (
                        <div
                            style={{
                                width: "96%",
                                borderColor: "black",
                                borderStyle: "solid",
                                paddingTop: "1vh",
                                paddingBottom: "1vh",
                                paddingLeft: "1vw",
                                marginTop: "1vh",
                            }}
                        >
                            {product.name} (${Math.floor(product.cost / 1)}.
                            {String(product.cost % 1)
                                .substring(2)
                                .padEnd(2, "0")
                                .substring(0, 2)}
                            )
                            <Button
                                onClick={() => {
                                    const index = cart.indexOf(product);
                                    const cartCopy = [...cart];
                                    cartCopy.splice(index, 1);
                                    setCart(cartCopy);
                                    setNum(num - 1);
                                    setCost(cost - product.cost);

                                    if (cartCopy.length === 0) {
                                        handleClose();
                                    }
                                }}
                                style={{ float: "right", marginTop: "-1vh" }}
                            >
                                <DeleteIcon />
                            </Button>
                        </div>
                    ))}
                    <hr></hr>
                    <strong>Billing Details</strong> <br></br>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="first"
                        label="First Name"
                        style={{ width: "49%" }}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="last"
                        label="Last Name"
                        style={{ width: "49%", marginLeft: "2%" }}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="address"
                        label="Address"
                        fullWidth
                        variant="standard"
                    />
                    <hr></hr>
                    <strong>Card Details</strong> <br></br>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="card"
                        label="Card Number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        label="Expiry"
                        style={{ width: "49%" }}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="csv"
                        label="CSV"
                        type="password"
                        style={{ width: "49%", marginLeft: "2%" }}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCloseBuy}>Post</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
