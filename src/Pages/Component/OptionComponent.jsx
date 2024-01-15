import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {eDITOR ,ResetState} from '../../feature/Video/VideoSlice'
import SubtitlesComponent from './SubtitlesComponent'


const OptionComponent = ({HandleUploadVideo}) => {

    const dispatch=useDispatch()

const currentstate=useSelector((state)=>{
    const data=state?.VideoSubtitle_Editor?.EditorStatus

    return data
})

const currentvideo=useSelector((state)=>{
    const data=state?.VideoSubtitle_Editor?.VideoStatus.CurrentVideo
    if(data){
        return true
    }
    return false
})


useEffect(()=>{
},[currentstate,currentvideo])

    return (
        <div className='flex flex-row gap-4 justify-between items-center'>
            {/* edit cancel and upload button */}
            {(!currentstate&&currentvideo)&&
            <div className='flex flex-row flex-grow justify-between gap-4'>
                <div>
                 <button className='h-fit w-fit px-4 py-2 font-serif rounded-md bg-blue-400'
                    onClick={()=>dispatch(eDITOR({value:true}))}
                    >
                        Edit
                    </button>
                </div>
                <div className='flex flex-row gap-4'>
                    <button className='h-fit w-fit px-4 py-2 font-serif rounded-md bg-red-400'
                    onClick={()=>dispatch(ResetState())}
                    >
                        Cancel
                    </button>
                    <button className='h-fit w-fit px-4 py-2 font-serif rounded-md bg-purple-400'
                    onClick={HandleUploadVideo}>
                        Upload
                    </button>
                </div>
            </div>}
            {/* subtitles edit and saving it option */}
            {currentstate&&
                <SubtitlesComponent
                />
            }
        </div>
    )
}

export default OptionComponent