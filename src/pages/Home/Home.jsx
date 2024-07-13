import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import moment from "moment";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import img from "../../assets/ma_photo.jpg";
import img1 from "../../assets/food_3.png";
import img2 from "../../assets/food_4.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosIntance";
import Toast from "../../components/toastMessage/Toast";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
const [showToastMesg, setShowToasMsg] = useState({
  isShown :false,
  message:"",
  type:"add"
})

  const [allNotes, setAllNotes] = useState([ ]);
  const [userInfo, setUserInof] = useState(null);

  const navigate = useNavigate();

  // Modifier la note,\ une note 

  const handleEdit =  (noteDetails) =>{
    setOpenAddEditModal({isShown:true, data:noteDetails, type:"edit"})

  }

  //  handleCloseToast 

  const showToastMsssage = (message, type) =>{
    setShowToasMsg({
      isShown:true,
     message,
     type
    })

 }


  const handleCloseToast = () =>{
     setShowToasMsg({
       isShown:false,
      message:""
     })

  }

  // Recuperation de l utilisateur

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInof(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Récupérarion de donnée

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Une erreur inattendue est apparue. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto p-2">
     
        <div className="grid  grid-cols-3 gap-4 mt-10">

        {allNotes.map((item, index)=>(
           <NoteCard
           key={item._id}
           title={item.title}
           date={item.createdOn}
           content={item.content}
           tags={item.tags}
           isPinned={item.isPinned}
           onEdit={() => {handleEdit(item)}}
           onDelete={() => {}}
           onPinNote={() => {}}
         />

))}
         

          {/* <NoteCard
            title="Info  vol"
            date="12 Juillet 2026"
            content="Dans notre localité  y a eu un incendie  a 17h"
            tag="#Info"
            img={img2}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}

          /> */}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[28px] text-white " />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
            ariaHideApp={false}

        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}

          getAllNotes={getAllNotes}
          showToastMsssage={showToastMsssage}
        />
      </Modal>
      <Toast
       isShown={showToastMesg.isShown}
       message={showToastMesg.message}
       type={showToastMesg.type}
       onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
