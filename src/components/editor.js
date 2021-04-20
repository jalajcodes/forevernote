import { useState, useEffect } from "react";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { makeStyles } from "@material-ui/core/styles";
import BorderColorIcon from "@material-ui/icons/BorderColor";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: "calc(100% - 35px)",
        position: "absolute",
        left: "0",
        width: "300px",
        boxShadow: "0px 0px 2px black",
    },
    titleInput: {
        height: "50px",
        boxSizing: "border-box",
        border: "none",
        padding: "5px",
        fontSize: "24px",
        width: "calc(100% - 300px)",
        backgroundColor: "#29487d",
        color: "white",
        paddingLeft: "50px",
    },
    editIcon: {
        position: "absolute",
        left: "310px",
        top: "12px",
        color: "white",
        width: "10",
        height: "10",
    },
    editorContainer: {
        height: "100%",
        boxSizing: "border-box",
    },
}));

const Editor = ({ notes, selectedNote, selectedNoteIndex, noteUpdate }) => {
    const [text, setText] = useState(selectedNote && selectedNote.body);
    const [title, setTitle] = useState(selectedNote && selectedNote.title);
    const [id, setId] = useState(selectedNote && selectedNote.id);
    const [update, setUpdate] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        setText(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id);
    }, [selectedNote]);

    useEffect(() => {
        const timer = setTimeout(() => {
            noteUpdate(id, { title, body: text });
        }, 1500);

        return () => clearTimeout(timer);
    }, [update]);

    function updateBody(val) {
        setText(val);
        setUpdate((prev) => prev + 1);
    }
    function updateTitle(val) {
        setTitle(val);
        setUpdate((prev) => prev + 1);
    }

    return (
        <div className={classes.editorContainer}>
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
            <input
                className={classes.titleInput}
                placeholder="Note title..."
                value={title ? title : ""}
                onChange={(e) => updateTitle(e.target.value)}></input>
            <Quill theme="snow" value={text} onChange={updateBody} />
        </div>
    );
};

export default Editor;
