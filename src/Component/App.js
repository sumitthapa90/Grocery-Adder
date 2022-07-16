import React, { useState, useEffect } from "react";
import List from "./List";

const getLocalStoage = () => {
  let list = localStorage.getItem(`list`);
  if (list) {
    return JSON.parse(localStorage.getItem(`list`));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStoage());
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      alert("no respond");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  const clear = () => {
    setList("");
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem(`list`, JSON.stringify(list));
  }, [list]);

  return (
    <>
      <section className="container">
        <form onSubmit={handleSubmit} className="form">
          <h1>Grocery Adder</h1>

          <div className="input-field">
            <input
              type="text"
              placeholder="egg..."
              id="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </form>

        {list.length > 0 && (
          <div className="grocery-container">
            <List list={list} removeItem={removeItem} editItem={editItem} />
            <button onClick={clear} type="submit" className="clear-btn">
              Clear List
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
