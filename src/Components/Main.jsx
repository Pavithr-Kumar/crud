import React, { useContext, useEffect, useState } from "react";
import { IoMdContact } from "react-icons/io";
import { BiEdit, BiSearchAlt2 } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsPlusCircleFill } from "react-icons/bs";
import { showContext } from "../App";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

function Main() {
  const context = useContext(showContext);
  const [contacts, setContacts] = useState([]);

  async function delData(id) {
    try {
      await deleteDoc(doc(db, "contacts", id));

      context.setRender(context.render + 1);
    } catch (error) {}
    context.toastSuccess("Deleted Successfully");
  }
  useEffect(() => {
    async function getContacts() {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const conatctLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(conatctLists);
          return conatctLists;
        });
      } catch (error) {}
      console.log(contacts);
    }
    getContacts();
  }, []);

  function filterContacts(value) {
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const conatctLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filterResult = conatctLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filterResult);
      return filterResult;
    });
  }

  return (
    <div>
      <main className=" min-h-screen bg-gradient-to-tr from-orange-300 via-rose-400 to-purple-400 py-6 px-4">
        <div
          id="head"
          className=" lg:w-3/5 md:w-5/6 w-auto bg-white bg-opacity-30 py-5 px-5 mx-auto rounded "
        >
          <header>
            <div className=" flex  items-center p-2 justify-center gap-4 rounded">
              <img
                className="w-10"
                src="https://i.ibb.co/tX7WDW9/pngwing-com.png"
                alt="firebaseLogo"
              />
              <h1 className="text-3xl font-semibold ">FireBase Contact App</h1>
            </div>
            <div className="flex mt-10 10/12 sm:5/6 md:3/5 lg:w-3/5  mx-auto items-center justify-center">
              <div className=" flex justify-center  items-center">
                <input
                  onChange={(e) => filterContacts(e.target.value)}
                  type="text"
                  placeholder="Search Contact"
                  className="  bg-white bg-opacity-40 flex-1 placeholder:text-black py-2 md:px-6 lg:w-3/4 px-2 outline-none rounded"
                />
                <BiSearchAlt2 className="text-2xl relative right-8 cursor-pointer" />
              </div>
              <BsPlusCircleFill
                onClick={() => context.show()}
                className="text-3xl cursor-pointer text-slate-900 active:animate-ping"
              />
            </div>
          </header>
          <div id="container" className="mt-10">
            {contacts.map((contact, i) => {
              return (
                <div
                  key={contact.id}
                  className="flex items-center  md:4/5 w-full lg:w-4/5 justify-center gap-3 md:gap-10 lg:gap-10 bg-white bg-opacity-50 py-2 px-2 sm:px-1 md:px-4 lg:px-4 rounded mx-auto mb-3 min-w-400px"
                >
                  <IoMdContact className="text-2xl lg:text-4xl sm:text-2xl md:text-4xl text-lime-600" />
                  <div className="flex-grow">
                    <h2 className="font-semibold text-lg">{contact.name}</h2>
                    <p className="font-medium text-gray-800">{contact.email}</p>
                  </div>
                  <BiEdit
                    onClick={() => {
                      context.setUpdate({
                        name: contact.name,
                        id: contact.id,
                        email: contact.email,
                      });
                      context.show();
                    }}
                    className="text-2xl text-indigo-600 transform active:scale-110 cursor-pointer"
                  />
                  <RiDeleteBin5Fill
                    onClick={() => {
                      delData(contact.id);
                    }}
                    className="text-2xl text-red-600 cursor-pointer transform active:scale-110"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
