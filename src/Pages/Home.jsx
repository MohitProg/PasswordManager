import React, { useReducer } from "react";
import Form from "../Components/Form";
import Item from "../Components/Item";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  // const deletevalue=(password)=>{
  //   localStorage.setItem(
  //     "my-password",
  //     JSON.stringify(password.filter((value) => value.id !== id))
  //   );
  // return password.filter((value) => value.id !== id)
  // }

  // const passwordreducer=(password,action)=>{
  //   switch(action.type){
  //     case "DELETE":
  //       return deletevalue(password);

  //     default:
  //       return password
  //   }

  // }
  // const [password,dispatch]=useReducer(passwordreducer,[])
  const [password, setPassword] = useState([]);
  const [editablevideo, setEditablevideo] = useState(null);
  useEffect(() => {
    const password = localStorage.getItem("my-password");
    if (password) {
      setPassword(JSON.parse(password));
      // addpassword(JSON.parse(password))
    }
  }, []);

  const deletepassword = (id) => {
    // dispatch({type:"DELETE",payload:id})
    setPassword(password.filter((value) => value.id !== id));
    localStorage.setItem(
      "my-password",
      JSON.stringify(password.filter((value) => value.id !== id))
    );
  };

  const updatepassword = (id) => {
    const updatevalue = password.find((value) => value.id === id);

    setEditablevideo(updatevalue);
  };

  const updatevideodata = (editablevideo, data) => {
    const index = password.findIndex((value) => value.id === editablevideo.id);
    console.log(index);

    const newpassword = [...password];
    newpassword.splice(index, 1, data);
    console.log(newpassword);
    setPassword(newpassword);
    // updatevideodata(newpassword)
    localStorage.setItem("my-password", JSON.stringify(newpassword));
  };

  const addpassword = (data) => {
    setPassword([...password, data]);
    localStorage.setItem("my-password", JSON.stringify([...password, data]));
  };
  return (
    <>
      <div className="bg-black min-h-[100vh] flex p-2  flex-col gap-2">
        <Form
          addpassword={addpassword}
          password={password}
          seteditablevideo={setEditablevideo}
          editablevideo={editablevideo}
          updatevideodata={updatevideodata}
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
                  deletepassword={deletepassword}
                  updatepassword={updatepassword}
                  addpassword={addpassword}
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
