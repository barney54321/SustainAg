import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

import AddIcon from "@mui/icons-material/Add";

import Banner from "./Banner";

import axios from "axios";

import Select from "react-dropdown-select";

const PostCard = (props) => {
    const data = props.obj;
    return (
        <div>
            <hr></hr>
            <h3 style={{ marginBottom: "0vh" }}>
                <a href={"/community/" + data.id}>{data.title}</a>
            </h3>
            <h5 style={{ marginTop: "0vh", marginBottom: "0vh" }}>
                {data.first} {data.last}
            </h5>
            {data.count} Responses
        </div>
    );
};

export default function Community() {
    const [topic, setTopic] = useState(null);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const [postCategory, setPostCategory] = useState("Grants");

    useEffect(getPosts, [topic]);

    function getPosts() {
        axios.get("http://localhost:8100/community/list/" + topic).then((res) => {
            setPosts(res.data);
        });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setShowError(false);
    };

    const handleClosePost = () => {
        const first = document.getElementById("first").value;
        const last = document.getElementById("last").value;
        const email = document.getElementById("email").value;
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const category = postCategory[0]["value"];

        if (first === "" || last === "" || email === "" || title === "" || content === "") {
            setShowError(true);
            return;
        }

        const post = {
            first: first,
            last: last,
            email: email,
            title: title,
            content: content,
            category: category,
        };

        axios.post("http://localhost:8100/community/post", post).then((res) => {
            if (res !== 200) {
                console.log(res);
            }
            setOpen(false);
            setShowError(false);
            setTopic(topic);
        });
    };

    return (
        <>
            <Banner />

            <div
                style={{
                    marginTop: "5vh",
                    marginLeft: "2vw",
                    paddingTop: "2vh",
                    marginRight: "2vw",
                }}
            >
                <Button
                    onClick={handleClickOpen}
                    style={{
                        paddingBottom: "2vh",
                        paddingTop: "2vh",
                        paddingRight: "2vw",
                        backgroundColor: "#F9EBD9",
                        color: "black",
                    }}
                >
                    <AddIcon style={{ marginRight: "0.5vw", color: "#965541" }} /> Start a Thread
                </Button>

                <div
                    style={{
                        backgroundColor: "#F4F4F4",
                        marginTop: "5vh",
                        paddingLeft: "2vw",
                        paddingRight: "2vw",
                        paddingTop: "1vh",
                        paddingBottom: "1vh",
                    }}
                >
                    {/* <div>Search bar</div> */}

                    <div>
                        <table
                            style={{
                                width: "100%",
                                minWidth: "100%",
                                tableLayout: "fixed",
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td>
                                        <Button
                                            style={{ color: "black" }}
                                            onClick={() => setTopic("All")}
                                        >
                                            All
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: "black" }}
                                            onClick={() => setTopic("Grants")}
                                        >
                                            Grants
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: "black" }}
                                            onClick={() => setTopic("Crops")}
                                        >
                                            Crops
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: "black" }}
                                            onClick={() => setTopic("Pesticides")}
                                        >
                                            Pesticides
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: "black" }}
                                            onClick={() => setTopic("Insurance")}
                                        >
                                            Insurance
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: "black" }}
                                            onClick={() => setTopic("Technology")}
                                        >
                                            Technology
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ paddingBottom: "10vh" }}>
                    <h2>{topic == null ? "All Threads" : topic}</h2>

                    <div>
                        {posts.map((object, i) => (
                            <PostCard obj={object} key={i} />
                        ))}
                    </div>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Start Thread</DialogTitle>
                <DialogContent>
                    {showError ? (
                        <Alert severity="error">All fields need to be filled in</Alert>
                    ) : (
                        <></>
                    )}
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
                        id="title"
                        label="Title"
                        fullWidth
                        variant="standard"
                    />

                    <Select
                        options={[
                            { value: "Grants", label: "Grants" },
                            { value: "Crops", label: "Crops" },
                            { value: "Pesticides", label: "Pesticides" },
                            { value: "Insurance", label: "Insurance" },
                            { value: "Technology", label: "Technology" },
                        ]}
                        onChange={(opt) => setPostCategory(opt)}
                        style={{
                            backgroundColor: "white",
                            marginTop: "3vh",
                            width: "auto",
                            color: "black",
                        }}
                        placeholder="Category"
                    />

                    <TextField
                        margin="dense"
                        id="content"
                        label="Post Content"
                        fullWidth
                        multiline
                        rows={5}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClosePost}>Post</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
