import React, { useState, useEffect } from "react";
import reviews from "./data";
import "./App.css";

export default function App() {
  const [index, setIndex] = useState(0);
  const [toggle, setToggle] = useState(false);
  const { name, job, image, text } = reviews[index];
  const n = text.substring(0, 40);
  const read = () => {
    setToggle(!toggle);
  };
  const less = () => {
    setToggle(!toggle);
    text.substring(0, 40);
  };

  useEffect(() => {
    const lastIndex = reviews.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);
  const prevPerson = () => {
    if (index <= 0) setIndex(reviews.length - 1);
    else setIndex(index - 1);
  };
  const nextPerson = () => {
    if (index >= reviews.length - 1) setIndex(0);
    else setIndex(index + 1);
  };

  useEffect(() => {
    let slider = setInterval(() => {
      if (index >= reviews.length - 1) {
        setIndex(0);
      } else setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className="container">
      <div className="space">
        <h2>Reviews</h2>
        <i
          style={{ color: "#444", fontSize: "50px" }}
          onClick={prevPerson}
          className="fa fa-chevron-circle-left arrow"
        ></i>
      </div>
      <img src={image} alt={name} />
      <div className="details">
        <div className="review">
          <h1>{name}</h1>
          <h3>{job}</h3>
          {toggle ? (
            " "
          ) : (
            <div>
              <p>{n}...</p>
              <button className="btn" onClick={read}>
                READ MORE
              </button>
            </div>
          )}
          {toggle && (
            <div>
              <p>{text}</p>
              <button className="btn" onClick={less}>
                READ LESS
              </button>
            </div>
          )}
        </div>
        <i
          style={{ color: "#444", fontSize: "50px", paddingTop: "10px" }}
          onClick={nextPerson}
          className="fa fa-chevron-circle-right"
        ></i>
      </div>
    </div>
  );
}
