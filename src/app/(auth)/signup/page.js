"use client";
import Link from "next/link";
import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BiLoaderAlt } from "react-icons/bi";
import cookie from "cookie-cutter";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is a required field")
        .min(2, "Name must be atlease 2 characters long"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required()
        .min(6, "Password must be atleast 6 characters long"),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        const res = await axios.post("http://localhost:3030/api/user/", data);

        console.log(res);
        cookie.set("TokenForDemoApp", res.data.token);
        router.push("/");
      } catch (err) {
        console.log(err);
        setGlobalError("Something went wrong");
      }
    },
  });
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-[400px] flex flex-col items-center justify-center rounded-xl bg-slate-100 gap-14 p-5"
      >
        <p className="text-2xl font-bold ">SIGNUP PAGE</p>
        {globalError && (
          <p className="font-medium text-red-600 ">{globalError}</p>
        )}
        <div className="flex flex-col items-center justify-center w-full gap-8">
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label htmlFor="name">Your Name</label>
            <input
              className="px-4 w-full py-1 bg-transparent border-[1px] border-black rounded-md text-black"
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="font-semibold text-red-600 ">
                {formik.errors.name}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label htmlFor="email">Your Email</label>
            <input
              className="px-4 w-full py-1 bg-transparent border-[1px] border-black rounded-md text-black"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="font-semibold text-red-600 ">
                {formik.errors.email}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col items-start justify-start w-full gap-2">
            <label htmlFor="password">Your Password</label>
            <input
              className="px-4 w-full py-1 bg-transparent border-[1px] border-black rounded-md text-black"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="font-semibold text-red-600 ">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <button
            className="flex items-center justify-center px-6 py-2 font-semibold text-white bg-blue-600 rounded-md"
            type="submit"
          >
            {formik.isSubmitting ? (
              <p className=" animate-spin">
                <BiLoaderAlt />
              </p>
            ) : (
              "Signup"
            )}
          </button>

          <Link href="/login" className="hover:underline ">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
