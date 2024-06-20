import { NextPage } from "next/types";
import React from "react";

const Unauthorized: NextPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-5">
        <h1 className="text-lg">
          <i className="bi bi-exclamation-circle-fill me-2"></i>Du måste
          vara inloggad för att se denna sida.
        </h1>
        <a href="/api/auth/signin" className="btn-theme px-5 py-2">
          Logga in här
        </a>
      </div>
    </>
  );
};

export default Unauthorized;
