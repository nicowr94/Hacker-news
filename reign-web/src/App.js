import "./App.css";
import Navigation from "./components/Navigation/navigation";
import ListStories from "./components/ListStories/listStories";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [miListStories, setMiListStories] = useState([]);

  const getStories = async () => {
    const response = await fetch(`http://localhost:8080/story`);
    const response_data = await response.json();
    setMiListStories(response_data);
  };

  const deleteStory = async (id) => {
    setLoading(false);
    await fetch(`http://localhost:8080/story/${id}`, {
      method: "PUT",
    });
    getStories();
  };

  useEffect(() => {
    if (!loading) getStories();
    setLoading(true);
  }, [miListStories]);

  return (
    <div className="App">
      <Navigation/>

      {loading && miListStories.length !== 0 ? (
        <ListStories
          list={miListStories}
          loading={loading}
          deleteStory={(name) => deleteStory(name)}
        ></ListStories>
      ) : (
        <h2 className="msg-loading">loading...</h2>
      )}
    </div>
  );
}

export default App;
