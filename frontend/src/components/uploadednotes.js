import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import List from "./list";

export default function UploadedNotes() {
  const [notes, setNewNotes] = useState(null);
  const [formNote, setFormNote] = useState({
    title: "",
    content: "",
  });

  const [file, setFile] = useState(null); // New state for handeling files

  useEffect(() => {
    getNotes();
  }, []);

  function DeleteNote(id) {
    axios({
      method: "DELETE",
      url: `/notes/${id}/`,
    }).then((response) => {
      getNotes();
    });
  }

  function getNotes() {
    axios({
      method: "GET",
      url: "/notes/",
    })
      .then((response) => {
        const data = response.data;
        setNewNotes(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function createNote(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", formNote.title);
    formData.append("content", formNote.content);
    formData.append("file", file);

    axios({
      method: "POST",
      url: "/notes/",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      getNotes();
    });

    setFormNote({
      title: "",
      content: "",
    });
    setFile(null);
  }

  function handleChange(event) {
    const { value, name, type } = event.target;

    if (type === "file") {
      setFile(event.target.files[0]);
    } else {
      setFormNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    }
  }

  return (
    <div className="mt-11 text-center">
      <form className="create-note border-2">
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title"
          value={formNote.title}
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          value={formNote.content}
        />
        <input type="file" onChange={handleChange} name="file" />
        <button onClick={createNote}>Create Post</button>
      </form>
      {notes &&
        notes.map((note) => (
          <List
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            deletion={DeleteNote}
          />
        ))}
    </div>
  );
}
