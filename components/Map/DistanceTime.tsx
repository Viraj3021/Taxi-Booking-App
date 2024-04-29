import { DirectionDataContext } from '@/context/DirectionDataContext';
import React, { useContext } from 'react'

const DistanceTime = () => {
    const { directionData, setDirecrtionData } = useContext(DirectionDataContext);

  return directionData?.routes&&(
    <div className='bg bg-yellow-500 p-3 absolute'>
       <h2 className='text-yellow-100 opacity-80 text-[15px]'>
        Distance:<span className='font-bold mr-3 text-black  pl-1'>{(directionData?.routes[0]?.distance*0.000621371192).toFixed(2)} Miles</span>
        Duration:<span className='font-bold text-black pl-1'>{(directionData?.routes[0]?.duration/60).toFixed(2)} Min</span>
       </h2>
    </div>
  )
}

export default DistanceTime
