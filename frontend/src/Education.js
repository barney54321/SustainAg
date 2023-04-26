import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import Button from "@mui/material/Button";

import "react-datepicker/dist/react-datepicker.css";

import Select from "react-dropdown-select";

import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useNavigate } from "react-router-dom";

import Banner from "./Banner";

const productOptions = [
    { value: "leafy-greens", label: "Leafy Greens" },
    { value: "berries", label: "Strawberry" },
    { value: "grains", label: "Grains" },
    { value: "citruses", label: "Citruses" },
    { value: "pome-fruit", label: "Pome Fruit" },
    { value: "cruciferous", label: "Cruciferous" },
    { value: "stone-fruit", label: "Stone Fruit" },
    { value: "other", label: "Other" },
];

const sizeOptions = [
    { value: "small", label: "Small (Gross Cash Income Under $250,000)" },
    { value: "large", label: "Large (Gross Cash Income Over $250,000)" },
];

export default function Education() {
    const [savedProducts, setProducts] = useState(null);
    const [savedSize, setSize] = useState(null);
    const [savedDate, setDate] = useState(new Date());
    const [savedTime, setTime] = useState(null);
    const [dayOptions, setDayOptions] = useState([]);
    const [timeOptions, setTimeOptions] = useState([]);
    const [allOptions, setAllOptions] = useState({});
    const [open, setOpen] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openFailure, setOpenFailure] = React.useState(false);

    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenSuccess = () => {
        setOpenSuccess(true);
    };

    const handleCloseSuccess = () => {
        setOpen(false);
        navigate("/");
    };

    const handleClickOpenFailure = () => {
        setOpenFailure(true);
    };

    const handleCloseFailure = () => {
        setOpenFailure(false);
        navigate("/education");
    };

    const submitHandler = (e) => {
        e.preventDefault();

        var first = document.getElementById("first").value;
        var last = document.getElementById("last").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var address = document.getElementById("address").value;
        var date = savedDate;
        var time = savedTime;
        var size = savedSize;
        var products = savedProducts;

        if (
            first == null ||
            last == null ||
            email == null ||
            phone == null ||
            address == null ||
            date == null ||
            time == null ||
            size == null ||
            products == null
        ) {
            handleClickOpen();
            return;
        }

        var obj = {
            first: first,
            last: last,
            email: email,
            phone: phone,
            address: address,
            date: date,
            time: time,
            size: size,
            products: products,
        };

        axios.post("http://localhost:8100/education/schedule", obj).then((res) => {
            if (res["status"] === 200) {
                handleClickOpenSuccess();
            } else {
                handleClickOpenFailure();
            }
        });
    };

    useEffect(getOptions, []);

    function getOptions() {
        axios.get("http://localhost:8100/education/options").then((res) => {
            var data = res.data;
            var newList = [];
            var bigObj = {};
            for (var key in data) {
                var newDay = new Date(key);
                newList.push(newDay);
                bigObj[String(newDay.getMonth()) + "-" + String(newDay.getDate())] = [];

                for (var i = 0; i < data[key].length; i++) {
                    var time = data[key][i];
                    bigObj[String(newDay.getMonth()) + "-" + String(newDay.getDate())].push(time);
                }
            }
            setDayOptions(newList);
            setAllOptions(bigObj);

            var newTimeList = [];

            for (
                var j = 0;
                j <
                bigObj[String(new Date().getMonth()) + "-" + String(new Date().getDate())].length;
                j++
            ) {
                var option =
                    bigObj[String(new Date().getMonth()) + "-" + String(new Date().getDate())][j];
                newTimeList.push({ value: option, label: option });
            }
            setTimeOptions(newTimeList);
        });
    }

    function inDayOptions(date) {
        for (var i = 0; i < dayOptions.length; i++) {
            var day = dayOptions[i];
            if (day.getMonth() === date.getMonth() && day.getDate() === date.getDate()) {
                return true;
            }
        }

        return false;
    }

    function updateDate(date) {
        setDate(date);

        var newTimeList = [];

        try {
            for (
                var i = 0;
                i < allOptions[String(date.getMonth()) + "-" + String(date.getDate() - 1)].length;
                i++
            ) {
                var option = allOptions[String(date.getMonth()) + "-" + String(date.getDate() - 1)][i];
                newTimeList.push({ value: option, label: option });
            }
        } catch (error) {
            for (
                var j = 0;
                j < allOptions[String(date.getMonth()) + "-" + String(date.getDate())].length;
                j++
            ) {
                var option1 = allOptions[String(date.getMonth()) + "-" + String(date.getDate())][j];
                newTimeList.push({ value: option1, label: option1 });
            }
        }

        
        setTimeOptions(newTimeList);
    }

    return (
        <>
            {/* Banner */}
            <Banner/>

            <div
                style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5) ), url(farmers4.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "33vh",
                }}
            >
                <div
                    style={{
                        textAlign: "left",
                        color: "white",
                        marginTop: "0vh",
                        paddingLeft: "2vw",
                        paddingRight: "2vw",
                    }}
                >
                    <table style={{ width: "100%", minWidth: "100%" }}>
                        <tbody>
                            <tr>
                                <td>
                                    <h1>GREEN SUPPORT TEAM</h1>
                                </td>
                                <td style={{ textAlign: "right", color: "white" }}>
                                    <h1>WE'RE HERE TO HELP!</h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                style={{
                    height: "42vh",
                    backgroundColor: "#275230",
                    paddingTop: "5vh",
                    color: "white",
                    textAlign: "center",
                    paddingLeft: "12vw",
                    paddingRight: "12vw",
                }}
            >
                <h2>
                    <u>GET PERSONALIZED SUSTAINABILITY SUPPORT FOR YOUR FARM.</u>
                </h2>
                <br></br>

                <h4>
                    Sign up for your first free consultation down below. You don't pay anything
                    until you see real results. we find and apply to grants for you and recommend
                    tailored sustainable solutions for your farm. we have your back.
                </h4>
            </div>

            <div
                style={{
                    height: "auto",
                    backgroundColor: "#275230",
                    paddingTop: "5vh",
                    color: "white",
                    // textAlign: "center",
                    paddingLeft: "20vw",
                    paddingRight: "20vw",
                }}
            >
                <Box component="form" noValidate>
                    <TextField
                        id="first"
                        label="First Name"
                        variant="filled"
                        style={{ backgroundColor: "white", width: "26vw" }}
                    />
                    <TextField
                        id="last"
                        label="Last Name"
                        variant="filled"
                        style={{ backgroundColor: "white", width: "26vw", marginLeft: "6vw" }}
                    />{" "}
                    <br></br>
                    <TextField
                        id="email"
                        label="Email"
                        variant="filled"
                        style={{ backgroundColor: "white", width: "26vw", marginTop: "5vh" }}
                    />
                    <TextField
                        id="phone"
                        label="Phone Number"
                        variant="filled"
                        style={{
                            backgroundColor: "white",
                            width: "26vw",
                            marginLeft: "6vw",
                            marginTop: "5vh",
                        }}
                    />{" "}
                    <br></br>
                    <TextField
                        id="address"
                        label="Address"
                        variant="filled"
                        style={{ backgroundColor: "white", marginTop: "5vh", width: "58vw" }}
                    />
                </Box>

                <Select
                    multi
                    options={productOptions}
                    onChange={(products) => setProducts(products)}
                    style={{
                        backgroundColor: "white",
                        marginTop: "5vh",
                        width: "58vw",
                        color: "black",
                    }}
                    placeholder="Products"
                />

                <Select
                    options={sizeOptions}
                    onChange={(size) => setSize(size)}
                    style={{
                        backgroundColor: "white",
                        marginTop: "5vh",
                        width: "58vw",
                        color: "black",
                    }}
                    placeholder="Size of Farm"
                />

                <table style={{ width: "100%" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "30%", paddingTop: "5vh" }}>
                                <DatePicker
                                    showIcon
                                    selected={savedDate}
                                    onChange={updateDate}
                                    inline
                                    filterDate={inDayOptions}
                                    minDate={new Date()}
                                />
                            </td>
                            <td
                                style={{
                                    width: "30%",
                                    verticalAlign: "top",
                                    paddingRight: "0.5vw",
                                }}
                            >
                                <Select
                                    options={timeOptions}
                                    onChange={(time) => setTime(time)}
                                    style={{
                                        backgroundColor: "white",
                                        marginTop: "5vh",
                                        width: "auto",
                                        color: "black",
                                    }}
                                    placeholder="Appointment Time"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ paddingTop: "5vh", paddingLeft: "20vw" }}></div>

                <Box textAlign="center">
                    <Button
                        variant="contained"
                        href="/education"
                        style={{
                            borderRadius: 5,
                            backgroundColor: "#55B330",
                            padding: "18px 36px",
                            fontSize: "18px",
                            marginTop: "5vh",
                            marginBottom: "5vh",
                        }}
                        onClick={submitHandler}
                    >
                        SUBMIT
                    </Button>
                </Box>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title2">{"Error with Booking"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            All fields must be filled before booking a consultation.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>OK</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openSuccess}
                    onClose={handleCloseSuccess}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title1">{"Booking Made"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            A consultation has been scheduled. Check your email for details.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSuccess}>Return Home</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openFailure}
                    onClose={handleCloseFailure}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title1">{"Error with Booking"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            An error has occurred with processing your booking. Please refresh the
                            page and try again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseFailure}>Refresh</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
