import React, { useEffect } from 'react'
import { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { vTT } from '../../feature/Subtitles/SubtitleSlice'
import { eDITOR } from '../../feature/Video/VideoSlice'



const SubtitlesComponent = () => {

const dispatch=useDispatch();
  // start time of subtitle
  const [startTime, SetstartTime] = useState('')
  //end time of subtitle
  const [endTime, SetendTime] = useState('')
  //subtile
  const [caption, Setcaption] = useState('')

  const[Error,SetError]=useState(false)
  const[Error1,SetError1]=useState(false)

  const SelectedTimeStamp=useSelector((state)=>{
    const timestamp=state?.subtitles_VTT?.SubtitleTimestamp
    return timestamp
  })


  const handlestartTimeChange = (e) => {
    const inputTime = e.target.value;
    if (inputTime.length < 9) {     
      SetstartTime(inputTime);
      if (/^\d{2}:\d{2}:\d{2}$/.test(inputTime)!==true) {
        SetError(true)
      }
      else{
        SetError(false)
      }
    }

  };


  const handleendTimeChange = (e) => {
    const inputTime = e.target.value;
    if (inputTime.length < 9) {     
      SetendTime(inputTime);
      if (/^\d{2}:\d{2}:\d{2}$/.test(inputTime)!==true) {
        SetError1(true)
      }
      else{
        SetError1(false)
      }
    }
  
  };

  const AddingSubtitle = () => {
    if(startTime!==''&&endTime!==''&&caption!==''){
      dispatch(vTT({startTime,endTime,caption}))
      SetstartTime('')
      SetendTime('')
      Setcaption('')
    }
  }

  useEffect(()=>{
    if(SelectedTimeStamp){
      SetstartTime(SelectedTimeStamp.start)
      SetendTime(SelectedTimeStamp.end)
      Setcaption(SelectedTimeStamp.caption)
    }
  },[SelectedTimeStamp])



  return (
    <div className=' flex  flex-grow justify-between flex-col md:flex-row lg:gap-4 md:gap-2 gap-3'>
        <div className=' flex flex-col md:flex-row flex-grow bg-gray-200 rounded-xl gap-2 md:items-center lg:gap-2 md:gap-1'>
          <input
            type="text"
            value={startTime}
            onChange={handlestartTimeChange}
            placeholder="HH:MM:SS"
            className={`focus:outline-none rounded-xl border ${!Error? 'border-gray-500':'border-red-500 shadow-red-700 shadow-lg'} px-3 py-3 lg:w-32 lg:px-3 lg:py-3   md:w-24 md:px-2 md:py-2`}
          />
          To
          <input
            type="text"
            value={endTime}
            onChange={handleendTimeChange}
            placeholder="HH:MM:SS"
            className={` focus:outline-none rounded-xl border ${!Error1? 'border-gray-500':'border-red-500 shadow-red-700 shadow-lg'} px-3 py-3 lg:w-32 lg:px-3 lg:py-3   md:w-24 md:px-2 md:py-2`}
          />
          <input
            type="text"
            id="SubtitlesInput"
            value={caption}
            onChange={(e)=>Setcaption(e.target.value)}
            placeholder='Subtitles Text'
            className='focus:outline-none w-full h-fit font-serif rounded-xl border border-gray-500 px-3 py-3 lg:py-3 lg:px-3 lg:text-lg md:py-2 md:px-2 md:text-base' />
        </div>
      <div className='flex flex-row items-center gap-3 lg:gap-4 md:gap-2'>
        <button
          className='h-fit w-fit font-serif rounded-md bg-blue-400 px-4 py-2 lg:px-4 lg:py-2 md:px-3 md:py-1'
          onClick={AddingSubtitle}
          disabled={Error||Error1}
        >
          Add
        </button>
        <button className='h-fit w-fit font-serif rounded-md bg-red-400 px-4 py-2 lg:px-4 lg:py-2 md:px-3 md:py-1'
        onClick={()=>dispatch(eDITOR({value:false}))}
        >
          Cancel
        </button>
      </div>
    </div>

  )
}

export default SubtitlesComponent