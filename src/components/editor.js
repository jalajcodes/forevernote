import { useState, useEffect } from "react";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { makeStyles } from "@material-ui/core/styles";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { debounce } from "../lib/helpers";

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
        background: "linear-gradient(to left, #09299c, #3a5dda)",
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

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
];

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

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         noteUpdate(id, { title, body: text });
    //     }, 1500);

    //     return () => clearTimeout(timer);
    // }, [update, id, title, text]);
    function updateDB() {
        debounce(() => {
            noteUpdate(id, { title, body: text });
        }, 1500);
    }
    function updateBody(val) {
        setText(val);
        updateDB();
        // setUpdate((prev) => prev + 1);
    }
    function updateTitle(val) {
        setTitle(val);
        updateDB();
        // setUpdate((prev) => prev + 1);
    }

    return (
        <div className={classes.editorContainer}>
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
            <input
                className={classes.titleInput}
                placeholder="Note title..."
                value={title ? title : ""}
                onChange={(e) => updateTitle(e.target.value)}></input>
            <Quill
                theme="snow"
                value={text}
                onChange={updateBody}
                modules={{ toolbar: TOOLBAR_OPTIONS }}
            />
        </div>
    );
};

export default Editor;
