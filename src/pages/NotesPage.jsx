import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import axios from "axios";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  async function getNotes() {
    try {
      const rawData = await axios.get("http://localhost:8080/notes/get-notes", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log("inside getNotes");
      setNotes(rawData.data.data);
    } catch (e) {
      if (e.response.data.message === "No Notes found for this user")
        setNotes([]);
      console.log(e);
    }
  }
  return (
    <div className="flex">
      <Navbar notes={notes} setNotes={setNotes} getNotes={getNotes} />
      <Notes notes={notes} setNotes={setNotes} getNotes={getNotes} />
    </div>
  );
};

export default NotesPage;
