import React, { useContext, useReducer } from "react";
import Form from "../Components/Form";
import Item from "../Components/Item";
import { useState } from "react";
import { useEffect } from "react";
import ThemeContext from "../Context/ThemeContext";
import DispatchContext from "../Context/DispatchContext";

const Home = () => {
  const reducerpassword = (password, action) => {
    switch (action.type) {
      case "ADD":
        localStorage.setItem(
          "my-password",
          JSON.stringify([...password, action.payload])
        );
        return [...password, action.payload];
      case "DELETE":
        localStorage.setItem(
          "my-password",
          JSON.stringify(
            password.filter((value) => value.id !== action.payload)
          )
        );
        return password.filter((value) => value.id !== action.payload);
      case "UPDATE":
        const index = password.findIndex(
          (value) => value.id === action.payload.editablevideo.id
        );

        const newdata = action.payload.data;
        newdata["id"] = index + 1;

        const newpassword = [...password];

        newpassword.splice(index, 1, newdata);
        localStorage.setItem("my-password", JSON.stringify(newpassword));
        return newpassword;
      default:
        return password;
    }
  };

  const data = JSON.parse(localStorage.getItem("my-password")) || [];
  const [password, dispatch] = useReducer(reducerpassword, data);

  const [editablevideo, setEditablevideo] = useState(null);

  const updatepassword = (id) => {
    const updatevalue = password.find((value) => value.id === id);

    setEditablevideo(updatevalue);
  };


  const [mode, setMode] = useState("DarkMode");

  const ToggleMode = () => {
    if (mode === "DarkMode") {
      setMode("Light Mode");
    } else {
      setMode("DarkMode");
    }
  };

 

  return (
    <>
    <ThemeContext.Provider value={"black"}>

    

    <DispatchContext.Provider value={dispatch}>

   
    
      <div
        className={`${
          mode === "DarkMode" ? "bg-black" : "bg-yellow-200"
        } min-h-[100vh] flex p-2  flex-col gap-2`}
      >
        <button
          className={`px-1 py-2 ${
            mode === "DarkMode" ? "bg-white" : "bg-gray-500"
          }  w-[100px] rounded`}
          onClick={ToggleMode}
        >
          {mode}
        </button>
        <Form
          mode={mode}
         
          password={password}
          seteditablevideo={setEditablevideo}
          editablevideo={editablevideo}
        />
        {password.length === 0 && (
          <h1
            className={`text-center font-semibold ${
              mode === "DarkMode" ? "text-white" : "text-black"
            } mt-3 text-xl text-white`}
          >
            Please add some data
          </h1>
        )}
        <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-2 w-full lg:w-4/5 mx-auto">
          {password &&
            password.map((value) => {
              return (
                <Item
                  key={value.id}
                  
                  updatepassword={updatepassword}
                  mode={mode}
                  {...value}
                />
              );
            })}
        </div>
      </div>
      </DispatchContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};

export default Home;
