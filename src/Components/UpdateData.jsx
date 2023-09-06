import React, { useContext } from "react";

import Modal from "./Modal";
import { showContext } from "../App";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

function UpdateData() {
  const context = useContext(showContext);
  async function addData(data) {
    try {
      const dbRef = collection(db, "contacts");
      await addDoc(dbRef, data);
    } catch (error) {
      console.log(error);
    }
    context.toastSuccess("Added Successfully");
  }
  function getData(data) {
    addData(data);
    context.setRender(context.render + 1);
  }

  async function update(data) {
    try {
      const dbRef = doc(db, "contacts", data.id);
      await updateDoc(dbRef, data);
      context.setUpdate(null);
      context.setRender((prev) => prev + 1);
    } catch (error) {}
    context.toastSuccess("Updated Successfully");
  }

  return (
    <div>
      {" "}
      {context.showModal && <Modal getData={getData} update={update} />}
    </div>
  );
}

export default UpdateData;
