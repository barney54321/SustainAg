import React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

import Banner from "./Banner";

export default function Home() {
    return (
        <>
            <Banner />

            {/* Details */}
            <div style={{ backgroundColor: "#F4F4F4", height: "68vh", paddingTop: "10vh" }}>
                <div style={{ textAlign: "center", paddingLeft: "20vw", paddingRight: "20vw" }}>
                    <h1>
                        We're here to support your journey to <br></br>
                        <span style={{ color: "#FBBC04" }}>profitable,</span>{" "}
                        <span style={{ color: "#55B330" }}>sustainable</span> agriculture.
                    </h1>
                </div>
                <div style={{ textAlign: "center", paddingTop: "10vh", paddingLeft: "23vw", paddingRight: "23vw" }}>
                    <h3>
                        Thank you for showing interest in SustainAg. Sign up through this form to
                        get in touch with us.
                    </h3>
                </div>
            </div>

            {/* About */}
            <div style={{ height: "100vh", paddingLeft: "15vw", paddingRight: "15vw" }}>
                <div style={{ textAlign: "center", paddingTop: "10vh" }}>
                    <h1>About Us</h1>
                </div>

                <div style={{ textAlign: "center" }}>
                    At SustainAg, we offer one-on-one farm “Sustain Plans” to help farmers
                    transition to sustainable farming practices while maximizing profits. Our
                    Sustain Plans include grant application assistance, customized planning for
                    transitioning to sustainable farming, and connecting farmers with a local
                    network of like-minded individuals. <br></br>
                    <br></br>
                    <strong>Sustainable farming, tailored to your needs.</strong>
                    <br></br>
                    Our team of experts will work closely with you to understand your current
                    farming practices and help identify areas where you can make changes to improve
                    sustainability and become eligible for grants. <br></br>
                    <br></br>
                    <strong>Our mission is to ensure that you are profitable.</strong> <br></br>
                    In addition to support plans, we offer grant application assistance to help you
                    access funding for your sustainable farming practices. Our team will work with
                    you to identify relevant grant opportunities and fill out the application for
                    you.
                </div>

                <Box textAlign="center">
                    <Button
                        variant="contained"
                        href="/education"
                        style={{
                            borderRadius: 5,
                            backgroundColor: "#55B330",
                            padding: "18px 36px",
                            fontSize: "18px",
                            marginTop: "10vh",
                        }}
                    >
                        Register Here!
                    </Button>
                </Box>
            </div>

            {/* Farmers */}
            <div style={{ backgroundColor: "#F4F4F4", height: "100vh" }}>
                <div style={{ textAlign: "center", paddingTop: "10vh" }}>
                    <h1>Our Farmers</h1>
                </div>

                <div>
                    <Grid
                        container
                        spacing={5}
                        style={{ paddingLeft: "10vw", paddingRight: "10vw" }}
                    >
                        <Grid item md={4}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            >
                                <div>
                                    <img
                                        src="deacon.png"
                                        alt="Deacon"
                                        style={{
                                            width: "100%",
                                            height: "40vh",
                                            paddingLeft: "0%",
                                            paddingTop: "10px",
                                        }}
                                    ></img>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <strong>Deacon</strong>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            >
                                <div>
                                    <img
                                        src="caroline.jpg"
                                        alt="Caroline"
                                        style={{
                                            width: "100%",
                                            height: "40vh",
                                            paddingLeft: "0%",
                                            paddingTop: "10px",
                                        }}
                                    ></img>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <strong>Caroline</strong>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            >
                                <div>
                                    <img
                                        src="roberto.jpg"
                                        alt="Roberto"
                                        style={{
                                            width: "100%",
                                            height: "40vh",
                                            paddingLeft: "0%",
                                            paddingTop: "10px",
                                        }}
                                    ></img>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <strong>Roberto</strong>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}
