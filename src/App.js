import { createContext, useState } from "react";
import "./App.css";
import Main from "./Components/Main";
import UpdateData from "./Components/UpdateData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const showContext = createContext({});

function App() {
  function toastSuccess(msg) {
    toast.success(msg);
  }
  function toastFail(msg) {
    toast.error(msg);
  }
  function show() {
    setSShowModal((prev) => !prev);
  }
  const [showModal, setSShowModal] = useState(false);
  const [render, setRender] = useState(0);
  const [update, setUpdate] = useState(null);

  return (
    <div>
      <showContext.Provider
        value={{
          showModal: showModal,
          show: show,
          render: render,
          setRender: setRender,
          update: update,
          setUpdate: setUpdate,
          toastSuccess: toastSuccess,
        }}
      >
        <Main />
        <UpdateData />
      </showContext.Provider>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </div>
  );
}

export default App;
export { showContext };
