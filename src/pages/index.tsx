import { type NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { useState } from "react";

const Home: NextPage = () => {
  const Models: string[] = ["Model1", "Model2", "Model3"];
  const Licenses: number[] = Array.from({ length: 9 }, (_, index) => index + 1);
  const [Error, setError] = useState(false);
  const [formData, setformData] = useState({
    bach_model: "",
    date: "",
    quantity: 0,
    license: -1,
    comment: "",
  });
  
  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    if (!e.target) {
      return;
    }
    const { name, value } = e.currentTarget;
    
    const parsedValue = name === "quantity" || name === "license" ? parseInt(value) : value;
    
    setformData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };
  
  const submitData = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setError(false);
    console.log(formData);
    if(formData.bach_model != "" && formData.quantity > 0 && formData.license >= 0 ){
      const data = await axios.post("/api/batch", formData);
      console.log(data);
    }else{
      console.log("data is missing");
      setError(true);
    }
  }

  return (
    <>
      <Head>
        <title>Task form</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#201f1f]">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={submitData}
          action=""
          className="w-11/12 max-w-2xl rounded-lg border-2 border-yellow-500 p-10"
        >
          <h1 className="text-2xl font-medium text-white">Batch from</h1>
          <div className="flex flex-col gap-5 py-8">
            <select
              name="bach_model"
              className="block w-full rounded bg-white p-2"
              onChange={handleChange}
            >
              <option value="">shoose a Model</option>
              {Models.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              name="date"
              type="date"
              placeholder="dd/ mm/yyyy"
              className="block w-full rounded bg-white p-2"
              onChange={handleChange}
              value={formData.date}
              required
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              className="block w-full rounded bg-white p-2"
              onChange={handleChange}
              value={formData.quantity}
              required
            />
            <select
              name="license"
              className="block w-full rounded bg-white p-2"
              onChange={handleChange}
            >
              <option value="">shoose a Licence</option>
              {Licenses.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              name="comment"
              type="text"
              placeholder="Comment (not required)"
              className="block w-full rounded bg-white p-2"
              onChange={handleChange}
              value={formData.comment}
            />
          </div>
          {Error && <p className="text-red-500 pb-5">Data is missing</p>}
          <button
            type="submit"
            className="w-full rounded bg-yellow-600 p-3 text-xl font-medium text-white"
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default Home;
