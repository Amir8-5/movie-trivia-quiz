import Form from "../components/Form";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function MovieInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const [apiData, setApiData] = useState(null);
  const apiKey = "c0f5ebc6";

  async function handleApi(movieName) {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`
      );
      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();
      setApiData(data);
      console.log(data);
      navigate("/Main-page", {
        state: {
          apiData: data,
          formValues: location.state.formValues,
        },
      });
    } catch (error) {
      console.error(error);
      setApiData(null);
      alert("Enter a valid movie name");
    }
  }

  return (
    <main className="w-2/3 h-screen bg-tan ml-auto mr-auto rounded-lg flex items-start justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-4 pt-4">
        <label className="lato-bold text-lg">Enter the movie name</label>
        <Form onSubmit={handleApi} />
      </div>
    </main>
  );
}
