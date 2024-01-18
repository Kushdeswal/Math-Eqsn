import React, { useState, useEffect } from "react";
import axios from "axios";
import BIRDS from "vanta/dist/vanta.birds.min";
// import { Link } from "react-router-dom";
import EquationEditor from "equation-editor-react";
// import Getquestions from "./Getquestions";

function Addque(prop) {
  const [equation, setEquation] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
  });

  const [vantaEffect, setVantaEffect] = useState(null);

  const [formData, setFormData] = useState({
    question: "",
  });

  const [send, setsend] = useState();

  const [toggle, settoggle] = useState(true);

  const [value, setvalue] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const handleChange = (e, option) => {
    if (e?.target?.type === "text") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setEquation((prevEquation) => ({
        ...prevEquation,
        [option]: e,
      }));
    }
  };

  const data = {
    question: formData.question || "",
    option1: value.option1 ? `A) ${value.option1}` : `A) ${equation.option1}`,
    option2: equation.option2 ? `B) ${equation.option2}` : "",
    option3: equation.option3 ? `C) ${equation.option3}` : "",
    option4: equation.option4 ? `D) ${equation.option4}` : "",
    correctAnswer: send && send.length > 0 ? send[0][0] : "",
  };

  console.log("data",data);

  const data1 = () => {
    const a = data.option1 ? data.option1.split(" ") : [];
    const b = data.option2 ? data.option2.split(" ") : [];
    const c = data.option3 ? data.option3.split(" ") : [];
    const d = data.option4 ? data.option4.split(" ") : [];
    const arr = [a, b, c, d];
    const find = arr.filter((item) => item[1] === equation.correctAnswer);
    setsend(find);
  };

  const handleSubmit = () => {
    if (
      formData.question === "" ||
      formData.option1 === "" ||
      formData.option2 === "" ||
      formData.option3 === "" ||
      formData.option4 === "" ||
      formData.correctAnswer === ""
    ) {
      alert("please fill all inputs");
    } else {
      const options = [
        formData.option1,
        formData.option2,
        formData.option3,
        formData.option4,
      ];

      const isCorrectAnswerValid = options.includes(formData.correctAnswer);

      if (isCorrectAnswerValid) {
        data1();

        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput ? fileInput.files[0] : null;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("question", data.question);
        formData.append("option1", data.option1);
        formData.append("option2", data.option2);
        formData.append("option3", data.option3);
        formData.append("option4", data.option4);
        formData.append("correctAnswer", data.correctAnswer);

        axios
          .post("http://localhost:4000/api/user/formdata", formData)
          .then((res) => {
            alert("saved successfully");
            prop.settoggle(false);
            setFormData({
              question: "",
            });
            setEquation({
              option1: "",
              option2: "",
              option3: "",
              option4: "",
              correctAnswer: "",
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        alert("Correct Answer should match one of the options exactly");
      }
    }
  };

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: "#my-background",
          backgroundColor: 0x1258a9,
          color1: 0xea7f7f,
          color2: 0x7dcadb,
          waveHeight: 20,
          shininess: 50,
          waveSpeed: 1.5,
          zoom: 0.75,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    if (formData.correctAnswer !== "") {
      // Logic to be executed after formData.correctAnswer is updated
      data1();
    }
  }, [formData.correctAnswer ]);

  return (
    <>
      <div
        className="flex justify-center items-center  bg-[#cffafe]  overflow-hidden"
        id="my-background"
      >
        <div className="m-5 p-7 bg-[#ecfeff] rounded-lg">
          <label className="text-xl font-bold block">
            Question:
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={(e) => handleChange(e, "question")}
              className="border-black border-solid border-2 bg-[#ecfeff]  ml-16 rounded-lg p-1 w-[56%]"
            />
          </label>
          <br />
          <label className="text-xl labels font-bold flex mt-10 xs:flex-row xxs:flex-col">
            Option 1
            {
              toggle ? 
              <EquationEditor
              value={equation.option1}
              onChange={(e) => handleChange(e, "option1")}
              autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
              autoOperatorNames="sin cos tan"
              className="border-2 border-solid"
            />
            : 
            <input type="file" onChange={(e) => {
              const reader = new FileReader()
              reader.readAsDataURL(e.target.files[0])
              reader.onloadend = () => {
                  setvalue((prev) => ({ ...prev, option1: reader.result }))
              }
          }
          }/>
            }
            
          </label>

          
          <div className="float-left">
            <button className="border-3  " onClick={()=>settoggle(!toggle)}>click for image</button>
          </div>
          <label className="text-xl font-bold flex mt-16 xs:flex-row xxs:flex-col">
            Option 2
            <EquationEditor
              value={equation.option2}
              onChange={(e) => handleChange(e, "option2")}
              autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
              autoOperatorNames="sin cos tan"
              className="border-2 border-solid"
            />
          </label>
          <button className=" text-sm " onClick={() => settoggle(!toggle)}>
              click for image
            </button>
          <br />
          <label className="text-xl font-bold flex mt-12 xs:flex-row xxs:flex-col">
            Option 3
            <EquationEditor
              value={equation.option3}
              onChange={(e) => handleChange(e, "option3")}
              autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
              autoOperatorNames="sin cos tan"
              className="border-2 border-solid"
            />
          </label>
          <button className=" text-sm" onClick={() => settoggle(!toggle)}>
              click for image
            </button>
          <br />
          <label className="text-xl font-bold flex mt-10 xs:flex-row xxs:flex-col">
            Option 4
            <EquationEditor 
              value={equation.option4}
              onChange={(e) => handleChange(e, "option4")}
              autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
              autoOperatorNames="sin cos tan"
              className="border-2 border-solid"
            />
          </label>
          <button className=" text-sm" onClick={() => settoggle(!toggle)}>
              click for image
            </button>
          <br />
          <label className="text-md font-bold flex mt-10 flex-col corrected">
            Correct Answer:
            <EquationEditor
              value={equation.correctAnswer}
              onChange={(e) => handleChange(e, "correctAnswer")}
              autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
              autoOperatorNames="sin cos tan"
              className="border-2 border-solid"
            />
          </label>
          <button className=" text-sm" onClick={() => settoggle(!toggle)}>
              click for image
            </button>
          <br />
          <button
            className="text-xl font-bold border-b-2 bg-[fcd34d] border-solid mt-6 select-none rounded-lg bg-[#2563eb] py-3 px-6 text-center align-middle font-sans  uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Addque;