import React from "react";
import Logo from './logoo.svg';
import Form from "./form";

function App() {
  return (
    <div>

      {/* logo starts from here  */}

        <h1 className="bg-slate-950 p-3" > 
            <img src={Logo} alt="logo" className="sm:ml-3 xs:mt-3  md:ml-8 lg:ml-20 xl:ml-52 "/>
        </h1>

      {/* logo Ends from here  */}

      <Form />

    </div >
  )
}

export default App;