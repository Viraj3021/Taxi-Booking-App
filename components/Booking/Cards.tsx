import CardList from "@/app/data/CardList";
import Image from "next/image";
import React from "react";

const Cards = () => {
  return (
    <div>
      <h2 className="mt-4  font-semibold">Payment Methods</h2>
      <div className="grid grid-cols-5  md:grid-cols-3">
        {CardList.map((item, index) => (
          <div className="flex w-[60px] border-[1px] p-1 justify-center items-center mt-3 rounded-md  cursor-pointer hover:scale-110 transition-all" key={index}>
            <Image src={item.image} alt={item.name} width={55} height={70} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
