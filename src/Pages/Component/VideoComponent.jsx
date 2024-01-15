import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveSubtitle } from '../../feature/Subtitles/SubtitleSlice';
import { AddVideo } from '../../feature/Video/VideoSlice';




const UploadedVideo = ({videoFile,SubtitleFile}) => {

  return (
    <div className='w-full h-full'>
      <ReactPlayer 
      url={videoFile} 
      controls={true} 
      width={"100%"} 
      height={'100%'} 
      config={{
        file:{
          attributes: {
            crossOrigin: 'true'
          },
          tracks:[{
            kind:'subtitles',
            src:SubtitleFile,
            srcLang:'en',
            default:true
          }]
        }
      }}
       />
    </div>
  );
};



const VideoComponent = ({handleVideoFileData}) => {

  const [videoFile, setVideoFile] = useState(null);

  const dispatch=useDispatch()

  const videofile=useSelector((state)=>{
    const data=state?.VideoSubtitle_Editor?.VideoStatus.CurrentVideo
    if(data){
      return data
    }
    return null
  })

  const SubtitleFile=useSelector((state)=>{
    const filedata=state?.subtitles_VTT?.SubtitleLink
    return filedata
  })

  useEffect(()=>{
    setVideoFile(videofile)
  },[videofile])

  const HandleVideoSelect =(event) => {
    const file = event.target.files[0];
    handleVideoFileData(file)
    dispatch(AddVideo({value:URL.createObjectURL(file)}));
    dispatch(RemoveSubtitle({}));
  }


  return (
    !videoFile ?
     <div className='flex h-full '>
      <div className='m-auto flex flex-row gap-2 items-center'>
        <label htmlFor="videoFile" className='hover:cursor-pointer px-5 py-4 rounded-md shadow-lg bg-gray-500 hover:px-6 hover:py-5 font-serif text-white hover:text-lg '>
          <input id='videoFile' type="file" hidden accept={"video/*"} onChange={(event) => HandleVideoSelect(event)} />
          Add
        </label>
        <p className='text-lg '>
          Or Select From The List
        </p>
      </div>
    </div> :
      <UploadedVideo
      videoFile={videoFile}
      SubtitleFile={SubtitleFile}
      />
  )
}

export default VideoComponent