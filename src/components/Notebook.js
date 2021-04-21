import React from "react";
import { useState, useEffect } from "react";
import Editor from "./Editor";
import Sidebar from "./Sidebar";
import { projectFirestore, timestamp } from "../lib/firebase";
import { useAuth } from "../hooks/useAuth";
import { makeStyles } from "@material-ui/core";
import Progress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const Notebook = () => {
    const [notes, setNotes] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
    const [newNoteId, setNewNoteId] = useState(null);
    const { loading, user } = useAuth();
    const classes = useStyles();

    useEffect(() => {
        if (user) {
            projectFirestore
                .collection("notes")
                .where("author", "==", user.email)
                .orderBy("title", "desc")
                .onSnapshot((serverUpdate) => {
                    const notes = serverUpdate.docs.map((_doc) => {
                        const data = _doc.data();
                        data["id"] = _doc.id;
                        return data;
                    });
                    // console.log(notes);
                    setNotes(notes);
                    setNewNoteId(null);
                });
        }
    }, [user, notes]);

    useEffect(() => {
        if (newNoteId) {
            const newNoteIndex = notes.findIndex((_note) => _note.id === newNoteId);
            console.log("🚀 ~ newNoteIndex", newNoteIndex);
            console.log("🚀 ~ notes[newNoteIndex]", notes[newNoteIndex]);
            selectNote(notes[newNoteIndex], newNoteIndex);
            // setSelectedNoteIndex(newNoteIndex);
            // setSelectedNote(notes[newNoteIndex]);
        }
    }, [newNoteId, notes]);

    const selectNote = (note, index) => {
        setSelectedNote(note);
        setSelectedNoteIndex(index);
    };

    const newNote = async (title) => {
        const note = {
            title,
            body: "",
        };
        const newFromDB = await projectFirestore.collection("notes").add({
            title: note.title,
            body: note.body,
            author: user.email,
            timestamp,
        });
        const newId = newFromDB.id;
        setNotes([...notes, note]);
        setNewNoteId(newId);
    };

    const deleteNote = async (note) => {
        const noteIndex = notes.indexOf(note);
        setNotes(notes.filter((_note) => _note.id !== note.id));
        if (selectedNoteIndex === noteIndex) {
            selectNote(null, null);
        } else {
            if (notes.length > 1) {
                setSelectedNoteIndex(selectedNoteIndex - 1);
            }
        }

        await projectFirestore.collection("notes").doc(note.id).delete();
    };

    const noteUpdate = async (id, note) => {
        if (id && note) {
            await projectFirestore.collection("notes").doc(id).update({
                title: note.title,
                body: note.body,
                timestamp,
            });
        }
    };

    if (loading) {
        return (
            <div className={classes.root}>
                <Progress />;
            </div>
        );
    }

    return (
        <div className="app-container">
            <Sidebar
                selectedNoteIndex={selectedNoteIndex}
                notes={notes}
                setNotes={setNotes}
                setSelectedNote={setSelectedNote}
                selectNote={selectNote}
                newNote={newNote}
                deleteNote={deleteNote}
            />
            {selectedNote ? (
                <Editor
                    selectedNote={selectedNote}
                    selectedNoteIndex={selectedNoteIndex}
                    notes={notes}
                    noteUpdate={noteUpdate}
                />
            ) : null}
        </div>
    );
};

export default Notebook;
