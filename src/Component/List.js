import React from "react";
import { FcEditImage } from "react-icons/fc";
import { AiFillRest } from "react-icons/ai";

function List({ list, removeItem, editItem }) {
  return (
    <div className="grocery-item">
      {list.map((item) => {
        const { title, id } = item;
        return (
          <article key={id} className="list-item flex-sb">
            <h3 className="title">{title}</h3>
            <div className="btn-sec ">
              <button
                type="button"
                className="btn1"
                onClick={() => editItem(id)}
              >
                <FcEditImage />
              </button>
              <button type="button" onClick={() => removeItem(id)}>
                <AiFillRest />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
