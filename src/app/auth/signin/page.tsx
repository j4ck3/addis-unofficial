"use client";
import { NextPage } from "next";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  username: string | null;
  email: string;
  password: string;
}

const SignIn: NextPage = () => {
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
    if (formData.email != null && formData.email !== "" && formData.password != null && formData.password !== "") {

    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl mb-4 text-green-600">Logga In</h2>
          <form onSubmit={handleSubmit}>
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
              Logga In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn