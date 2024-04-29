import CarsList from "@/app/data/CarsList";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectCarAmountContext } from "@/context/SelectedCarAmountContext";
import Image from "next/image";
import React, { useContext, useState } from "react";

const Cars = () => {
  const[selectCar,setSelectCar]=useState<any>()
  const { directionData, setDirecrtionData } = useContext(DirectionDataContext);
  const {carAmount,setCarAmount}=useContext(SelectCarAmountContext)


  const getCost = (charges: any) => {
    return (charges * directionData.routes[0].distance * 0.000621371192).toFixed(2);
  };

  return (
    <div className="mt-6">
      <h2 className="font-semibold">Select Car</h2>
      <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
        {CarsList.map((item, index) => (
          <div
            key={index}
            className={`m-2 p-2 border-[1px] rounded-md flex flex-col justify-center items-center hover:bg-slate-200 cursor-pointer hover:scale-[1.02] ${index==selectCar?'border-yellow-400 border-[2px]':null}`}
          onClick={()=>{
            setSelectCar(index)
            setCarAmount(item.charges)
          }}
          >
            <Image src={item.image} alt={item.name} width={75} height={90} />
            <h2 className="text-[12px] float-start mt-1">{item.name}</h2>
            {directionData.routes?
            <span className="float-right text-[14px] mt-1">
              {getCost(item.charges)}$
            </span>:null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
