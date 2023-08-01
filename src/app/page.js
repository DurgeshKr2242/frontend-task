"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
export default function Home() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      console.log(res);
      setdata(res.data);
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-full min-h-screen ">
      <p className="my-2 text-2xl font-bold uppercase">ALL PRODUCTS</p>
      <div className="p-2 max-w-[1400px] gap-6 w-full flex flex-wrap  justify-center">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center w-full p-4 bg-gray-200 rounded-lg basis-[30%] hover:shadow-lg cursor-pointer transition-all duration-300 ease-in-out group gap-8 min-w-[300px]"
          >
            <div className="relative w-24 h-24 overflow-hidden">
              <Image src={item.image} alt={item.title} objectFit="cover" fill />
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start justify-start gap-0">
                <p className="text-base opacity-80">Category</p>
                <p className="text-lg">{item.category}</p>
              </div>
              <div className="flex flex-col items-start justify-start gap-0">
                <p className="text-base opacity-80">Price</p>
                <p className="flex items-center justify-center gap-1 text-lg">
                  <FaIndianRupeeSign className="text-green-500" />
                  {item.price}
                </p>
              </div>
            </div>
            {/* <div className="flex flex-col items-start justify-start gap-4"> */}
            <div className="flex flex-col items-start justify-start w-full gap-0">
              <p className="text-base opacity-80">Name</p>
              <p className="text-lg transition-all duration-300 ease-in-out group-hover:text-blue-600">
                {item.title}
              </p>
            </div>
            <div className="flex flex-col items-start justify-start gap-0">
              <p className="text-base opacity-80">Description</p>
              <p className="text-sm text-left">{item.description}</p>
            </div>
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
