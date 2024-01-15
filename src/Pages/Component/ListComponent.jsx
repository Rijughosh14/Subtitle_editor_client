import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import ReactPlayer from 'react-player'
import axios from 'axios'
import { AddVideo } from '../../feature/Video/VideoSlice'
import { AddVttLink, deleteSubtitle, RemoveSubtitle, SelectSubtitle, SetVTT } from '../../feature/Subtitles/SubtitleSlice'
import { ParsingVttContent } from '../../Service/UserService'
import { useCallback } from 'react'



const SubtitleList=()=>{

  const [captionList,SetcaptionList]=useState([])
  const [DeleteButton,SetDeleteButton]=useState(false)
  const [DeleteButtonIndex,SetDeleteButtonIndex]=useState(-1)

  const dispatch=useDispatch()
  
  const subtitlesData=useSelector((state)=>{
    const data=state?.subtitles_VTT?.SubtitleVtt  
    return data
  })


  const handleSelectSubtitle=(d)=>{
    dispatch(SelectSubtitle({d}))
  }

  const handleDeleteSubtitle=(i)=>{
    dispatch(deleteSubtitle({i}))
  }

  const handlemouseover=(index)=>{
    SetDeleteButton(true)
    SetDeleteButtonIndex(index)
  }

  const handlemouseout=()=>{
    SetDeleteButton(false)
    SetDeleteButtonIndex(-1)
  }

  useEffect(()=>{
    if(subtitlesData.length>0){
      SetcaptionList(subtitlesData)
    }
    else{
      SetcaptionList([])
    }
  },[subtitlesData])

  return(
    <div className='flex flex-col h-full '>
      <div className='h-full overflow-y-auto'>
    {
      captionList.map((d,index)=>{
        return(
          <div 
          key={index} 
          className='mb-2 hover:cursor-pointer flex flex-row justify-between'
          onMouseOver={()=>handlemouseover(index)}
          onMouseOut={handlemouseout}         
          >
            <div>
           <p className='break-words font-bold'
           onClick={()=>handleSelectSubtitle(d)}
           >
            {`${index+1}. ${d.start} --> ${d.end}`}
            </p>
            <p className='break-words text-xl font-bold text-blue-900'>
             {d.caption}
            </p>
            </div>
            {(DeleteButton&&DeleteButtonIndex===index&&captionList.length>1)&&<div 
            className='h-fit w-fit hover:cursor-pointer'
            onClick={()=>handleDeleteSubtitle(index)}
            >
            <i className="fa-solid fa-trash"></i>
            </div>}
          </div>
        )
      })
    }
      </div>
    {captionList.length!==0&&<div className='flex mt-2 justify-center'>
      <button 
      className='py-2 px-3 h-fit rounded-lg text-lg bg-blue-800 text-white'
      onClick={()=>dispatch(RemoveSubtitle())}
      >
        Clear
      </button>
    </div>}
    </div>
  )
}

const StoredVideos=()=>{

  const [storedVideos,SetstoredVideos]=useState([])

  const dispatch=useDispatch()

  const getdata=async()=>{
    const response=await axios.get('/getuploadData')
    SetstoredVideos(response.data)
  }

  const GetParesedVtt=async(value)=>{
    const parsedVtt=await ParsingVttContent(value)
    dispatch(SetVTT({parsedVtt}))
    }


  const handleSelectedVideo=(Vlink,Slink)=>{
    dispatch(AddVideo({value:Vlink}))
   if(Slink!==''&&Slink!==null){
      GetParesedVtt(Slink)
    }
    dispatch(AddVttLink({value:Slink}))
  }


  useEffect(()=>{
    getdata()
  },[])

  return(
    <>
    {
      storedVideos.map((d,index)=>{

        return(
        <div key={index} className='mb-2 hover:cursor-pointer w-full h-32 border border-black' onClick={()=>handleSelectedVideo(d.VideoUrl,d.VttUrl)}>
          <ReactPlayer url={d.VideoUrl} height={'100%'} width={'100%'}/>
        </div>
        )
      })
    }
    </>
  )
}

const ListComponent = () => {

  const status=useSelector((state)=>{
    const data=state?.VideoSubtitle_Editor?.VideoStatus?.CurrentVideo
    return data
  })

  return (
    status?<SubtitleList/>:<StoredVideos/>
  )
}

export default ListComponent