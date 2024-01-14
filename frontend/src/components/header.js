import React from "react";
import "../css/index.css";

export default function Header() {
  return (
    <div className="flex justify-between">
      <div>
        <img src="notationlogo.png" width={500} height={500}></img>
      </div>
      <div>
        <h1 className="text-5xl text-center">Notation</h1>
        <h2 className="">An app that truly expands your notes!"</h2>
      </div>
    </div>
  );
}
