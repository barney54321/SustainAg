import React from "react";

export default function Banner() {
    return (
        <>
            {/* Banner */}
            <div
                style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(satellite.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "22vh",
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
            </div>
        </>
    );
}
