"use client";
import { NextPage } from "next";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUp: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl mb-4 text-green-600">Registrering</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Användarnamn:
              <input
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block mb-2">
              E-post:
              <input
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block mb-2">
              Lösenord:
              <input
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <button
              type="submit"
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Registrera Dig
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
