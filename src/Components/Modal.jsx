import React, { createPortal } from "react-dom";
import { TiDelete } from "react-icons/ti";
import { showContext } from "../App";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

function Modal({ getData, update }) {
  const context = useContext(showContext);
  // const [data, setdata] = useState({ name: "", email: "" });

  const [userData, setUserData] = useState(context.update);

  return createPortal(
    <div>
      <div className="flex flex-col md:w-[35%] md:h-[40%] sm:w-[40%] sm:h-[45%] lg:w-[30%] lg:h-[35%] bg-white fixed top-1/2 left-1/2 z-20 p-3 -translate-x-1/2 -translate-y-1/2 rounded">
        <TiDelete
          onClick={() => context.show()}
          className=" text-3xl sm:text-3xl md:text-3xl lg:text-3xl self-end cursor-pointer active:animate-spin"
        />
        <div className="flex flex-col gap-2 items-baseline mx-auto w-80 rounded">
          <label className="text-lg" htmlFor="name">
            name
          </label>
          <input
            defaultValue={context.update !== null ? context.update.name : ""}
            autoFocus
            onChange={(e) => {
              setUserData({ ...userData, name: e.target.value });
            }}
            type="text"
            name="name"
            className="border w-4/5 border-gray-600 outline-none px-3 py-1 rounded "
          />
          <label className="text-lg" htmlFor="email">
            email
          </label>
          <input
            defaultValue={context.update !== null ? context.update.email : ""}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type="text"
            name="email"
            className="border w-4/5 border-gray-600 outline-none px-3 py-1 rounded"
          />
          <button
            onClick={() => {
              if (context.update !== null) {
                update(userData);
                context.setUpdate(null);
              } else if (userData === null) toast.warn("Name is mandatory!");
              else {
                getData(userData);
              }
              context.show();
            }}
            className="px-4 py-2 mt-1 bg-gradient-to-tr from-rose-400 to-pink-600 text-white rounded "
          >
            {context.update !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <div className="h-screen w-screen backdrop-blur-[2px] z-10 fixed top-0"></div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
