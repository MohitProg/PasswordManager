import React, { useReducer } from "react";
import Form from "../Components/Form";
import Item from "../Components/Item";
import { useState } from "react";
import { useEffect } from "react";

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




  return (
    <>
      <div className="bg-black min-h-[100vh] flex p-2  flex-col gap-2">
        <Form
          dispatch={dispatch}
          password={password}
          seteditablevideo={setEditablevideo}
          editablevideo={editablevideo}
          
        />
        {password.length === 0 && (
          <h1 className="text-center mt-3 text-xl text-white">
            Please add some data
          </h1>
        )}
        <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-2 w-full lg:w-4/5 mx-auto">
          {password &&
            password.map((value) => {
              return (
                <Item
                  key={value.id}
                  dispatch={dispatch}
                  updatepassword={updatepassword}
         
                  {...value}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
