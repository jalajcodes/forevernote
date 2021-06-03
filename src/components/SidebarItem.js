import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { removeHTMLTags } from "../lib/helpers";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";

const useStyles = makeStyles((theme) => ({
    listItem: {
        cursor: "pointer",
        backgroundColor: "#fff",
        "&:hover": {
            backgroundColor: "#eee",
        },
    },
    textSection: {
        maxWidth: "85%",
    },
    deleteIcon: {
        position: "absolute",
        right: "5px",
        top: "calc(50% - 15px)",
        "&:hover": {
            color: "#dd0000",
        },
    },
}));

const SidebarItem = ({ _note, _index, selectedNoteIndex, selectNote, deleteNote }) => {
    const classes = useStyles();

    const handleDeleteNote = (e, n) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete: ${n.title}`)) {
            deleteNote(n);
        }
    };
    return (
        <div key={_index}>
            <ListItem
                className={classes.listItem}
                selected={selectedNoteIndex === _index}
                onClick={() => selectNote(_note, _index)}
                alignItems="flex-start">
                <div className={classes.textSection}>
                    <ListItemText
                        primary={_note.title}
                        secondary={
                            removeHTMLTags(_note.body.substring(0, 30)) + "..."
                        }></ListItemText>
                </div>
                <DeleteOutlineRoundedIcon
                    onClick={(e) => handleDeleteNote(e, _note)}
                    className={classes.deleteIcon}
                />
            </ListItem>
        </div>
    );
};

export default SidebarItem;
