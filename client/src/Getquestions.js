import React , {useState , useEffect} from 'react'
import axios from 'axios';

const Getquestions = (prop) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/api/user/get-questions')
      .then((response) => {
        setQuestions(response.data.result);
        console.log(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error.message);
      });
  }, []);
  return (
   <>
   
    <div className='getdata container mx-auto p-9 overflow-hidden'>
    <div className="text-center">
          <button
            className="text-xl font-bold border-b-2 bg-[fcd34d] border-solid mt-6 select-none rounded-lg bg-[#2563eb] py-3 px-6 text-center align-middle font-sans  uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
            onClick={() => prop.settoggle(true)}
          >
            Add New Questions From Here...
          </button>
        </div>
      <div className='my-data p-8'>
      {questions.map((question, index) => (
          <div key={index} className='m-2 p-5'>
            <div className='flex text-xl font-semibold my-4'><h3>Q</h3>{`${index + 1}. ${question.question}`}</div>
            {question.option1.length < 10000 ? <div className='text-xl font-semibold my-1'>{`A) ${question.option1}`}</div> : <div className='flex gap-4'>A) <img className='w-20' src={question.option1} /> </div>}
            <div className='text-xl font-semibold my-1'>{`B) ${question.option2}`}</div>
            <div className='text-xl font-semibold my-1'>{`C) ${question.option3}`}</div>
            <div className='text-xl font-semibold my-1'>{`D) ${question.option4}`}</div>
            <div className='text-xl font-semibold my-1'>{`Answer: ${question.correctAnswer}`}</div>
          </div>
        ))}

      </div>




    </div>
   
   </>
  )
}

export default Getquestions
