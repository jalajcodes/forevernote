import { useState, useEffect, useRef } from "react";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { makeStyles } from "@material-ui/core/styles";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import FullscreenRoundedIcon from "@material-ui/icons/FullscreenRounded";
import FullscreenExitRoundedIcon from "@material-ui/icons/FullscreenExitRounded";

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
        flex: 1,
        width: "calc(100% - 300px)",
        backgroundColor: "#09299c",
        color: "white",
        paddingLeft: "50px",

        "&:focus": {
            border: "none",
            outline: "none",
        },
    },
    editIcon: {
        position: "absolute",
        left: "310px",
        top: "12px",
        color: "white",
        width: "10",
        height: "10",
    },
    editorTitleBar: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        backgroundColor: "#09299c",
        color: "#fff",
    },
    editorContainer: {
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        backgroundColor: "white",
    },
    fullscreenIcon: {
        cursor: "pointer",
    },
}));

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["link", "image", "blockquote", "code-block"],
    ["clean"],
];

const Editor = ({ notes, selectedNote, selectedNoteIndex, noteUpdate }) => {
    const [text, setText] = useState(selectedNote && selectedNote.body);
    const [title, setTitle] = useState(selectedNote && selectedNote.title);
    const [id, setId] = useState(selectedNote && selectedNote.id);
    const [update, setUpdate] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const ref = useRef(null);
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
    }, [update, noteUpdate, title, text, id]);

    useEffect(() => {
        const listener = function () {
            const full_screen_element = document.fullscreenElement;
            let quill = document.querySelector(".quill");
            let input = document.querySelector(".titleInput");

            if (full_screen_element !== null) {
                setIsFullscreen(true);
                quill.style.width = "100%";
                input.style.paddingLeft = "18px";
            } else {
                setIsFullscreen(false);
                quill.style.width = "calc(100% - 300px)";
                input.style.paddingLeft = "50px";
            }
        };
        let element = ref.current;
        if (element) {
            element.addEventListener("fullscreenchange", listener);
        }
        return () => {
            if (element) {
                element.removeEventListener("fullscreenchange", listener);
            }
        };
    }, [ref]);

    const updateBody = (val) => {
        setText(val);
        setUpdate((prev) => prev + 1);
    };
    const updateTitle = (val) => {
        setTitle(val);
        setUpdate((prev) => prev + 1);
    };
    const handleFullscreen = () => {
        if (ref.current) {
            if (!isFullscreen && document.fullscreenElement === null) {
                ref.current.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div ref={ref} className={classes.editorContainer}>
            <div className={classes.editorTitleBar}>
                {!isFullscreen && <BorderColorIcon className={classes.editIcon}></BorderColorIcon>}
                <input
                    title="Click to edit title"
                    className={classes.titleInput + " titleInput"}
                    placeholder="Note title..."
                    value={title ? title : ""}
                    onChange={(e) => updateTitle(e.target.value)}
                />
                <div className={classes.fullscreenIcon} onClick={handleFullscreen}>
                    {isFullscreen ? (
                        <FullscreenExitRoundedIcon titleAccess="Exit Fullscreen" fontSize="large" />
                    ) : (
                        <FullscreenRoundedIcon fontSize="large" titleAccess="Fullscreen" />
                    )}
                </div>
            </div>
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
