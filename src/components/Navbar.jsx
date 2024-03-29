import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = ({ notes, setNotes, getNotes }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const addNote = async () => {
    onCloseModal();
    try {
      const data = await axios.post(
        "http://localhost:8080/notes/create-note",
        { title: title.trim(), description: description.trim() },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      getNotes();
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/join");
  };

  return (
    <>
      <div className="w-[80px] justify-between min-h-screen border-r-2 border-slate-500 pt-5 pb-5 relative">
        <div
          className="w-[60px] h-[60px] rounded-[100%] bg-black flex justify-center items-center m-auto"
          onClick={onOpenModal}
        >
          <IoMdAdd color="white" className="w-[30px] h-[30px]" />
        </div>
        <div
          className="w-[60px] h-[60px] rounded-[100%] bg-black flex justify-center items-center m-auto absolute start-[10px] bottom-[10px]"
          onClick={logout}
        >
          <CiLogout color="white" className="w-[30px] h-[30px]" />
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="w-[250px] h-[280px] flex flex-col gap-2">
          <h2 className="text-center font-comforta">Add Note</h2>
          <input
            className="focus:outline-none m-auto text-center w-[230px] h-[30px] p-1 border border-slate-400 rounded font-comforta"
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            className="focus:outline-none m-auto w-[230px] h-[200px] p-2 border border-slate-400 rounded font-comforta"
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            className="border bg-slate-800 text-white px-12 py-2 m-auto rounded font-comforta"
            onClick={addNote}
          >
            Add
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
