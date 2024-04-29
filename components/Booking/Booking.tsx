"use client";
import React, { useContext } from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { SelectCarAmountContext } from "@/context/SelectedCarAmountContext";

const Booking = () => {
  const router: any = useRouter();
  const { carAmount, setCarAmount } = useContext(SelectCarAmountContext);

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div className="border-[1px] p-5 rounded-md h-[72vh]">
        <AutocompleteAddress />
        <Cars />
        <Cards />
        <button
          className={`w-full bg-yellow-400 p-1 rounded-md mt-6 ${
            !carAmount ? "bg-gray-200" : null
          }`}
          disabled={!carAmount}
          onClick={() => {
            router.push("/payment");
          }}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default Booking;
