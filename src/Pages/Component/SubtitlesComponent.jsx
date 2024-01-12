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
    <div className=' flex flex-row flex-grow justify-between gap-4'>
      <div className='flex-grow'>
        <div className=' flex flex-row bg-gray-200 rounded-xl w-full  gap-2 items-center'>
          <input
            type="text"
            value={startTime}
            onChange={handlestartTimeChange}
            placeholder="HH:MM:SS"
            className={`px-3 py-3  focus:outline-none rounded-xl border ${!Error? 'border-gray-500':'border-red-500 shadow-red-700 shadow-lg'} w-32`}
          />
          To
          <input
            type="text"
            value={endTime}
            onChange={handleendTimeChange}
            placeholder="HH:MM:SS"
            className={`px-3 py-3  focus:outline-none rounded-xl border ${!Error1? 'border-gray-500':'border-red-500 shadow-red-700 shadow-lg'} w-32`}
          />
          <input
            type="text"
            id="SubtitlesInput"
            value={caption}
            onChange={(e)=>Setcaption(e.target.value)}
            placeholder='Subtitles Text'
            className=' px-3 py-3  focus:outline-none flex-grow h-fit  text-lg font-serif rounded-xl border border-gray-500' />
        </div>
      </div>
      <div className='flex flex-row gap-4 items-center '>
        <button
          className='h-fit w-fit px-4 py-2 font-serif rounded-md bg-blue-400'
          onClick={AddingSubtitle}
          disabled={Error||Error1}
        >
          Add
        </button>
        <button className='h-fit w-fit px-4 py-2 font-serif rounded-md bg-red-400'
        onClick={()=>dispatch(eDITOR({value:false}))}
        >
          Cancel
        </button>
      </div>
    </div>

  )
}

export default SubtitlesComponent