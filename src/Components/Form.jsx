import React, { useEffect, useState } from "react";

const Form = ({ setPassword, password,editablevideo,seteditablevideo,addpassword,updatevideodata }) => {
  const [visible, setVisible] = useState(true);
  const [data, SetData] = useState({
    id: "",
    email: "",
    password: "",
    account: "",
  });
  useEffect(() => {
    const password = localStorage.getItem("my-password");
    if (password) {
      // setPassword(JSON.parse(password));
      addpassword(JSON.parse(password))
    }
  }, []);

  useEffect(()=>{
    if(editablevideo){
      SetData(editablevideo)

    }
  },[editablevideo])

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
    console.log(editablevideo);

    if(editablevideo){

      // const index=password.findIndex((value)=>value.id===editablevideo.id)
      // console.log(index);

      // const newpassword=[...password]
      // newpassword.splice(index,1 ,data);
      // console.log(newpassword);
      // setPassword(newpassword);
      updatevideodata(editablevideo,data)
      // localStorage.setItem("my-password",JSON.stringify(newpassword))
      
    }else{
      addpassword(data)
      // setPassword([...password, data]);
      // localStorage.setItem("my-password", JSON.stringify([...password, data]));

    }

    seteditablevideo(null)


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
      className="flex bg-white mx-auto text-lg font-semibold flex-col mt-3 p-2 w-full sm:w-2/3 lg:w-2/3 gap-2 shadow  rounded"
    >
      <h1 className="text-center text-xl  font-bold">Password Manager</h1>
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
      <button className="bg-gray-500 px-1 py-2 w-1/3 mx-auto rounded hover:bg-green-300 text-lg font-bold">
        Submit
      </button>
    </form>
  );
};

export default Form;
