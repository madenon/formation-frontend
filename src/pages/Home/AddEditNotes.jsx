import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosIntance from "../../utils/axiosIntance";
const AddEditNotes = ({ noteData, type, getAllNotes, onClose,showToastMsssage }) => {
  const [title, setTitle] = useState(noteData?.title || " ");
  const [content, setContent] = useState(noteData?.content || " ");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  // Ajutons une Note

  const addNewNote = async () => {
    try {
      const response = await axiosIntance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMsssage("La note a bien été  ajouté avec succès")
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.message);
      }
    }
  };

  // Modifier note
  const editNote = async () => {
    const noteId = noteData._id
    try {
      const response = await axiosIntance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMsssage("La note a bien été  mis a jour avec succès")
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.message);
      }
    }


    
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Votre note  doit avoir un titre ");
      return;
    }
    if (!content) {
      setError("Votre note  doit avoir une note un contenu");
      return;
    }
    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Titre</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none bg-slate-50"
          placeholder="Une information "
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENU</label>
        <textarea
          type="text"
          className=" text-sm text-slate-950 outline-none bg-slate-50"
          placeholder="Contenu  du text"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">
          <TagInput tags={tags} setTags={setTags} />
        </label>
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        className="btn-primary font-medium mt-2 p-2"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "Ajouter"}
      </button>
    </div>
  );
};

export default AddEditNotes;
