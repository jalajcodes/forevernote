import { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "./sidebarItem";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: "calc(100% - 35px)",
        position: "absolute",
        left: "0",
        width: "300px",
        boxShadow: "0px 0px 2px black",
    },
    newChatBtn: {
        borderRadius: "0px",
    },
    unreadMessage: {
        color: "red",
        position: "absolute",
        top: "0",
        right: "5px",
    },
    newNoteBtn: {
        width: "100%",
        height: "35px",
        borderBottom: "1px solid black",
        borderRadius: "0px",
        backgroundColor: "#29487d",
        color: "white",
        opacity: 0.9,
        "&:hover": {
            opacity: 1,
            backgroundColor: "#29487d",
        },
    },
    sidebarContainer: {
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
        backgroundColor: "#28787c",
        borderRadius: "0px",
        color: "white",
        opacity: 0.9,
        "&:hover": {
            opacity: 1,
            backgroundColor: "#28787c",
        },
    },
}));

const Sidebar = ({ notes, selectedNoteIndex, selectNote, deleteNote, newNote }) => {
    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState("");
    const inputRef = useRef();

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
    // const selectNote = (n, i) => ;

    return (
        <div className={classes.sidebarContainer}>
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
        </div>
    );
};

export default Sidebar;
