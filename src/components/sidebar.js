import { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import Exit from "@material-ui/icons/ExitToApp";
import SidebarItem from "./SidebarItem";
import { useAuth } from "../hooks/useAuth";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: "calc(100% - 35px)",
        position: "absolute",
        left: "0",
        width: "300px",
        boxShadow: "0px 0px 2px black",
    },
    newNoteBtn: {
        width: "100%",
        height: "35px",
        borderBottom: "1px solid black",
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
        position: "relative",
        marginTop: "0px",
        width: "300px",
        height: "100%",
        boxSizing: "border-box",
        float: "left",
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
        background: "linear-gradient(to left, #09299c, #3a5dda)",
        borderRadius: "0px",
        color: "white",
        opacity: 0.9,
        transition: "all 3s",
        "&:hover": {
            opacity: 1,
            background: "linear-gradient(to left, #3a5dda, #09299c)",
        },
    },
    userInfoPanel: {
        position: "absolute",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#09299c",
        color: "#fff",
        width: "100%",
        padding: "10px",
    },
    logoutIcon: {
        cursor: "pointer",
    },
}));

const Sidebar = ({
    notes,
    selectedNoteIndex,
    selectNote,
    deleteNote,
    newNote,
    setSelectedNote,
}) => {
    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState("");
    const inputRef = useRef();
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
        setSelectedNote(null);
        signout();
    };

    return (
        <div className={classes.sidebarContainer}>
            {!user && <Redirect to="/" />}
            <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
                New Note
            </Button>
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
