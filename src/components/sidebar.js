import { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import Exit from "@material-ui/icons/ExitToApp";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SidebarItem from "./SidebarItem";
import { useAuth } from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: "calc(100% - 35px)",
        position: "absolute",
        left: "0",
        width: "300px",
        boxShadow: "0px 0px 2px black",
    },
    mainBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#09299c",
        color: "#fff",

        "& h1": {
            fontFamily: "Lobster",
            display: "inline",
            letterSpacing: "2px",
            padding: "0 0 0 15px",
            pointerEvents: "none",
        },
    },
    newNoteBtn: {
        height: "50px",
        borderRadius: "0px",
        backgroundColor: "#09299c",
        color: "white",
        opacity: 0.9,
        "&:hover": {
            opacity: 1,
            backgroundColor: "#09299c",
        },
    },
    sidebarContainer: {
        background: "#eee",
        position: "relative",
        marginTop: "0px",
        width: "300px",
        height: "100%",
        boxSizing: "border-box",
        float: "left",
        paddingBottom: "40px",
        overflowY: "scroll",
        overflowX: "hidden",
    },
    newNoteInput: {
        width: "100%",
        margin: "0px",
        height: "35px",
        outline: "none",
        border: "none",
        paddingLeft: "5px",
        "&:focus": {
            outline: "2px solid rgba(81, 203, 238, 1)",
        },
    },
    newNoteSubmitBtn: {
        width: "100%",
        borderRadius: "0px",
        color: "white",
        backgroundColor: "#09299c",
        opacity: 1,
        transition: "all .3s",
        "&:hover": {
            opacity: 0.9,
            backgroundColor: "#09299c",
        },
    },
    userInfoPanel: {
        position: "fixed",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#09299c",
        color: "#fff",
        width: "290px",
        padding: "10px",
    },
    logoutIcon: {
        cursor: "pointer",
    },
    menuToggle: {
        cursor: "pointer",
        backgroundColor: "#09299c",
        width: "40px",
        height: "40px",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        position: "absolute",
        bottom: 0,
        right: "0",
    },
}));

const Sidebar = ({ notes, selectedNoteIndex, selectNote, deleteNote, newNote }) => {
    const [addingNote, setAddingNote] = useState(false);
    // const [mobileOpen, setMobileOpen] = useState(true);
    const [title, setTitle] = useState("");
    const inputRef = useRef();
    const sidebarRef = useRef();
    const { user, signout } = useAuth();
    const classes = useStyles();

    const newNoteBtnClick = () => {
        setAddingNote((prev) => !prev);
    };
    useEffect(() => {
        if (addingNote) {
            inputRef.current.focus();
        }
    }, [addingNote]);

    const updateTitle = (title) => {
        setTitle(title);
    };
    const addNewNote = () => {
        if (title === "") {
            return;
        }
        newNote(title);
        setTitle("");
        setAddingNote(false);
    };
    const handleLogoutBtnClick = () => {
        console.log("logout");
        signout();
    };

    return (
        <div ref={sidebarRef} className={classes.sidebarContainer}>
            <div className={classes.mainBar}>
                <h1>Forevernote</h1>
                <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
                    <PostAddIcon />
                </Button>
            </div>
            {addingNote ? (
                <div>
                    <input
                        ref={inputRef}
                        type="text"
                        className={classes.newNoteInput}
                        placeholder="Enter note title"
                        onKeyUp={(e) => updateTitle(e.target.value)}></input>
                    <Button className={classes.newNoteSubmitBtn} onClick={addNewNote}>
                        Submit Note
                    </Button>
                </div>
            ) : null}
            <div className={classes.noteList}>
                <List>
                    {notes &&
                        notes.map((_note, _index) => {
                            return (
                                <div key={_index}>
                                    <SidebarItem
                                        _note={_note}
                                        _index={_index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={selectNote}
                                        deleteNote={deleteNote}></SidebarItem>
                                    <Divider></Divider>
                                </div>
                            );
                        })}
                </List>
            </div>
            {user && (
                <div className={classes.userInfoPanel}>
                    {user.email}{" "}
                    <Exit
                        onClick={handleLogoutBtnClick}
                        className={classes.logoutIcon}
                        titleAccess={"Logout"}
                    />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
