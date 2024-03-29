import React, { useContext, useEffect, useState } from "react";

import useDispatch from "../hooks/Dispatchhook";

const Form = ({
  password,
  editablevideo,
  seteditablevideo,

  mode,
}) => {
  const dispatch=useDispatch()
  const [visible, setVisible] = useState(true);
  const [data, SetData] = useState({
    id: "",
    email: "",
    password: "",
    account: "",
  });

  
  useEffect(() => {
    if (editablevideo) {
      SetData(editablevideo);
    }
  }, [editablevideo]);

  const handleChange = (e) => {
    e.stopPropagation();
    SetData({
      ...data,
      id: password.length + 1,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (editablevideo) {
      dispatch({ type: "UPDATE", payload: { editablevideo, data } });
    } else {
      dispatch({ type: "ADD", payload: data });
    }

    seteditablevideo(null);

    SetData({
      id: "",
      email: "",
      password: "",
      account: "",
    });
  };

  
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex ${
        mode === "DarkMode" ? "bg-white" : "bg-gray-400"
      } mx-auto sm:text-lg font-semibold flex-col mt-3 p-2 w-full sm:w-2/3 lg:w-2/3 gap-2 ${
        mode === "DarkMode" ? "text-black" : "text-black"
      } shadow  rounded`}
    >
      <h1 className="text-center sm:text-xl  font-bold">Password Manager</h1>
      <label htmlFor="">Email</label>
      <input
        type="text"
        name="email"
        required={true}
        onChange={handleChange}
        className="p-1 border-[2px] appearance-none ring-1 "
        value={data.email}
      />
      <div className="flex flex-col relative gap-2">
        <label htmlFor="">Password</label>
        <input
          type={visible ? "text" : "password"}
          name="password"
          onChange={handleChange}
          value={data.password}
          className="p-1 border-[2px] appearance-none ring-1 "
        />
        <i
          onClick={() => setVisible(!visible)}
          className={`bi bi-eye${
            visible ? "" : "-slash"
          } absolute right-2  top-[55%]  text-xl`}
        ></i>
      </div>
      <label htmlFor="">Account link</label>
      <input
        type="text"
        name="account"
        required
        value={data.account}
        onChange={handleChange}
        className="p-1 border-[2px] appearance-none ring-1 "
      />
      <div className="flex justify-between">
        <button className="bg-gray-500 px-1 py-2 w-1/3 mx-auto rounded hover:bg-green-300  sm:text-lg font-bold">
          {editablevideo ? "Update Password" : "Add Password"}
        </button>
      </div>
    </form>
  );
};

export default Form;
