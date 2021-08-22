import React from "react";
import "./navigation.css";

export default function navigation() {
  const title = "HN Feed",
    desc = "We <3 hacker news!";
  return (
    <>
      <nav className="nav-home">
        <h1>{title}</h1>
        <h3>{desc}</h3>
      </nav>
    </>
  );
}
