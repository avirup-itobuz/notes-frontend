import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";

const Notes = ({ notes, setNotes, getNotes }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [updateId, setUpdateId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");

  async function verifyUser() {
    if (token != null) {
      try {
        const verify = await axios.get(
          `http://localhost:8080/user/verify-user/${token}`
        );
        if (!verify.status) {
          navigate("/join");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      navigate("/join");
    }
  }
  async function deleteNote(id) {
    try {
      console.log("inside delete notes 1");
      const rawData = await axios.delete(
        `http://localhost:8080/notes/delete-note/${id}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log("inside delete notes 2");
      getNotes();
    } catch (e) {
      alert(e);
    }
  }
  async function updateNote() {
    onCloseModal();
    try {
      console.log(updateId);
      if (
        updateTitle.trim().length !== 0 &&
        updateDescription.trim().length !== 0
      ) {
        const data = await axios.put(
          `http://localhost:8080/notes/update-note/${updateId}`,
          { title: updateTitle.trim(), description: updateDescription.trim() },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
          }
        );
        getNotes();
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  }
  async function searchNote(title) {
    try {
      const rawData = await axios.get(
        `http://localhost:8080/notes/notes-search/?title=${title}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      const data = rawData.data.data;
      console.log(data);
      setNotes(data);
    } catch (e) {
      alert(e.response.data.message);
    }
  }
  async function updateImp(id, imp) {
    try {
      const data = await axios.put(
        `http://localhost:8080/notes/update-note/${id}`,
        { imp: !imp },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      getNotes();
    } catch (e) {
      alert(e.response.data.message);
      console.log(e);
    }
  }

  useEffect(() => {
    verifyUser();
    getNotes();
  }, []);

  const colors = [
    "bg-[#FD9B71]",
    "bg-[#FEC96F]",
    "bg-[#B491FD]",
    "bg-[#E3EE8E]",
    "bg-[#00D4FD]",
  ];

  return (
    <>
      <div className="flex-col m-auto mt-[0px]">
        <div className="m-[20px] my-[40px] flex justify-between">
          <h2 className="font-comforta text-4xl font-extrabold">Notes</h2>
          <input
            className="focus:outline-none text-center w-[210px] h-[30px] p-1 border border-slate-400 rounded font-comforta"
            type="text"
            placeholder="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchNote(e.target.value);
              }
            }}
          />
        </div>

        <div className="notes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 font-sans">
          {notes.map((note, index) => {
            return (
              <div
                className={`note w-[260px] h-[250px] rounded-[20px] m-auto ${
                  colors[index % 5]
                } p-5 relative`}
                key={note._id}
              >
                <h3 className="text-2xl text-gray-900 font-comforta truncate">
                  {note.title.slice(0, 30)}
                </h3>
                <p className="text-gray-900 font-comforta">
                  {note.description.slice(0, 80)}
                </p>
                <div
                  className="absolute  bg-slate-800 cursor-pointer w-[40px] h-[40px] rounded-[100%] flex justify-center items-center start-5 bottom-5"
                  onClick={() => {
                    updateImp(note._id, note.imp);
                  }}
                >
                  <FaStar
                    className="w-[20px] h-[20px]"
                    color={note.imp ? "yellow" : "white"}
                  />
                </div>
                <div className="flex gap-4 absolute end-5 bottom-5">
                  <div
                    className="delete bg-slate-800 cursor-pointer w-[40px] h-[40px] rounded-[100%] flex justify-center items-center"
                    onClick={() => {
                      setUpdateId(note._id);
                      setUpdateTitle(note.title);
                      setUpdateDescription(note.description);
                      onOpenModal();
                    }}
                  >
                    <MdModeEdit className="w-[20px] h-[20px]" color="white" />
                  </div>
                  <div
                    className="delete bg-slate-800 cursor-pointer w-[40px] h-[40px] rounded-[100%] flex justify-center items-center"
                    onClick={() => {
                      deleteNote(note._id);
                    }}
                  >
                    <MdDelete className="w-[20px] h-[20px]" color="#b30000" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="w-[250px] h-[270px] flex flex-col gap-2">
          <h2 className="text-center font-comforta">Update Note</h2>
          <input
            className="focus:outline-none m-auto text-center w-[210px] h-[30px] p-1 border border-slate-400 rounded font-comforta"
            type="text"
            placeholder="Title"
            value={updateTitle}
            onChange={(e) => {
              setUpdateTitle(e.target.value);
            }}
          />
          <textarea
            className="focus:outline-none m-auto w-[210px] h-[150px] p-2 border border-slate-400 rounded font-comforta"
            type="text"
            placeholder="Description"
            value={updateDescription}
            onChange={(e) => {
              setUpdateDescription(e.target.value);
            }}
          />
          <button
            className="border bg-slate-800 text-white px-12 py-2 m-auto rounded font-comforta"
            onClick={updateNote}
          >
            Update
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Notes;
