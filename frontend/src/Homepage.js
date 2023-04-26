import React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

export default function Home() {
    return (
        <>
            {/* Extended Banner */}
            <div
                style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(satellite.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "100vh",
                    // width: "100%",
                }}
            >
                <div style={{ textAlign: "right", color: "white", paddingTop: "1vh" }}>
                    <strong>
                        <a
                            href="/#about"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                paddingRight: "15px",
                            }}
                        >
                            ABOUT US
                        </a>
                        <a
                            href="/education"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                paddingRight: "15px",
                            }}
                        >
                            SUPPORT TEAM
                        </a>
                        <a
                            href="/community"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                paddingRight: "15px",
                            }}
                        >
                            COMMUNITY
                        </a>
                        <a
                            href="/products"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                paddingRight: "15px",
                            }}
                        >
                            PRODUCTS
                        </a>
                        {/* <a
                            href="/account"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                paddingRight: "15px",
                            }}
                        >
                            SIGN UP
                        </a> */}
                    </strong>
                </div>

                <div
                    style={{
                        textAlign: "left",
                        color: "white",
                        marginTop: "-4vh",
                        paddingLeft: "2vw",
                    }}
                >
                    <h1>
                        <a
                            href="/"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            SUSTAINAG
                        </a>
                    </h1>
                </div>

                <div style={{ textAlign: "center", color: "white", paddingTop: "20vh" }}>
                    <h2>
                        Your personalized plan for sustainable agricultural products & services.
                    </h2>
                </div>

                <div style={{ textAlign: "center", color: "white", paddingTop: "15vh" }}>
                    The platform that eases your transition to sustainable agriculture.
                </div>
            </div>

            {/* Details */}
            <div style={{ backgroundColor: "#F4F4F4", height: "100vh", paddingTop: "5vh" }}>
                <div style={{ textAlign: "center", paddingLeft: "20vw", paddingRight: "20vw" }}>
                    <h1>
                        We're here to support your journey to <br></br>
                        <span style={{ color: "#FBBC04" }}>profitable,</span>{" "}
                        <span style={{ color: "#55B330" }}>sustainable</span> agriculture.
                    </h1>
                </div>
                <div style={{ textAlign: "center" }}>
                    <h3>
                        We come to you with specialized support and customized planning for your
                        farm.
                    </h3>
                </div>

                <div
                    style={{
                        paddingLeft: "10vw",
                        paddingRight: "10vw",
                        paddingTop: "5vh",
                        paddingBottom: "5vh",
                    }}
                >
                    <Grid container spacing={5} style={{ height: "40vh", paddingTop: "3vh" }}>
                        <Grid item md={3.9}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    border: "1px solid black",
                                    borderRadius: "15px",
                                    padding: "1vh",
                                }}
                            >
                                <div>
                                    <img
                                        src="store.png"
                                        alt="marketplace"
                                        style={{
                                            width: "30%",
                                            paddingLeft: "35%",
                                            paddingTop: "10px",
                                        }}
                                    ></img>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <h3>Marketplace</h3>
                                </div>
                                <div style={{ textAlign: "center", color: "#55B330" }}>
                                    <strong>Sustainable Products</strong>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    Find all of your sustainable production inputs in one place.
                                    Browse through sustainable pesticides, fertilizers, herbicides,
                                    and more.
                                </div>
                            </Box>
                        </Grid>
                        <Grid item md={3.9}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    border: "1px solid black",
                                    borderRadius: "15px",
                                    padding: "1vh",
                                }}
                            >
                                <div>
                                    <img
                                        src="heart2.png"
                                        alt="handshake"
                                        style={{
                                            width: "35%",
                                            paddingLeft: "34%",
                                            marginTop: "-5px",
                                            marginBottom: "-4.5%"
                                        }}
                                    ></img>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <h3>Green Support</h3>
                                </div>
                                <div style={{ textAlign: "center", color: "#55B330" }}>
                                    <strong>Sustainability Consulting</strong>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    Get personal, specific help to increase your profits when going
                                    sustainable.
                                </div>
                                <div style={{ textAlign: "center", paddingTop: "3vh" }}>
                                    <strong>First consultation is free!</strong>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item md={3.9}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    border: "1px solid black",
                                    borderRadius: "15px",
                                    padding: "1vh",
                                }}
                            >
                                <div>
                                    <img
                                        src="people2.png"
                                        alt="People"
                                        style={{
                                            width: "26%",
                                            paddingLeft: "37%",
                                            paddingTop: "10px",
                                        }}
                                    ></img>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <h3>Farmers Network</h3>
                                </div>
                                <div style={{ textAlign: "center", color: "#55B330" }}>
                                    <strong>Community</strong>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    Connect with fellow farmers to share experiences and get advice
                                    on managing your business.
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </div>

            {/* About */}
            <div id="about" style={{ height: "100vh", paddingLeft: "15vw", paddingRight: "15vw" }}>
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
                                        src="deacon.jpg"
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
                                    <strong>Deacon</strong> <br></br>
                                    Sustainag has been essential in helping me switch to sustainable
                                    agriculture smoothly.
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
                                    <strong>Caroline</strong> <br></br>I didn’t know where to look
                                    or how to switch to sustainable agriculture. sustainag provided
                                    customized solutions for my farm.
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
                                    <strong>Roberto</strong> <br></br>
                                    SustainAg me introdujo al concepto de agricultura sustentable.
                                    Su support team vino a mi finca y me mostraron que ser
                                    sustenable es saludable para mis plantes y mis trabajadores.
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}
