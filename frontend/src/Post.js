import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

import { useParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import Banner from "./Banner";

import axios from "axios";

export default function Post() {
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);
    const [showError, setShowError] = useState(false);

    const { id } = useParams();

    console.log(id);

    useEffect(getPost, [id]);

    function getPost() {
        axios.get("http://localhost:8100/community/post/" + id).then((res) => {
            setPost(res.data);
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
        const content = document.getElementById("content").value;

        if (first === "" || last === "" || email === "" || content === "") {
            setShowError(true);
            return;
        }

        const post = {
            first: first,
            last: last,
            email: email,
            content: content,
            post: id
        };

        axios.post("http://localhost:8100/community/comment", post).then((res) => {
            if (res !== 200) {
                console.log(res);
            }
            setOpen(false);
            setShowError(false);
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
                {post !== null ? (
                    <div>
                        {post.post.category}
                        <h1>{post.post.title}</h1>
                        <h4>
                            {post.post.first} {post.post.last}
                        </h4>

                        {post.post.content}

                        {post.comments.map((comment) => (
                            <div>
                                <hr></hr>
                                <h4>
                                    {comment.first} {comment.last}
                                </h4>

                                {comment.content}
                            </div>
                        ))}
                    </div>
                ) : (
                    <></>
                )}

                <Button
                    onClick={handleClickOpen}
                    style={{
                        marginTop: "2vh",
                        marginBottom: "2vh",
                        paddingBottom: "2vh",
                        paddingTop: "2vh",
                        paddingRight: "2vw",
                        backgroundColor: "#F9EBD9",
                        color: "black",
                    }}
                >
                    <AddIcon style={{ marginRight: "0.5vw", color: "#965541" }} /> Add Comment
                </Button>
            </div>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add Comment</DialogTitle>
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
                        id="content"
                        label="Comment Content"
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
