import React from 'react'
import OptionComponent from './Component/OptionComponent'
import VideoComponent from './Component/VideoComponent'
import ListComponent from './Component/ListComponent'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { update, upload } from '../Service/UserService'
import { toast } from 'react-toastify';




const Index = () => {
    const [VideoFileData, SetVideoFileData] = useState(null)

    const vttfile = useSelector((state) => {
        const data = state?.subtitles_VTT?.SubtitleVtt
        return data
    })

    const videoUrl = useSelector((state) => {
        const url = state?.VideoSubtitle_Editor?.VideoStatus.CurrentVideo
        return url
    })

    // getting video file for upload
    const handleVideoFileData = (value) => {
        SetVideoFileData(value)
    }

    const HandleUploadVideo = async () => {
        if (VideoFileData) {
            try {
                await toast.promise(upload(VideoFileData, vttfile), {

                    pending: 'uploading',
                    success: 'Success 👌',
                    error: 'something went wrong 🤯'

                })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                await toast.promise(update(videoUrl, vttfile), {

                    pending: 'updating',
                    success: 'Successfully updated 👌',
                    error: 'something went wrong 🤯'

                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <div className="min-w-screen bg-gray-900 h-screen flex flex-row px-5 py-10 gap-6">
                <div className='w-3/4   flex flex-col '>
                    <div className="bg-gray-100 rounded-3xl shadow-xl w-full h-90p">
                        <VideoComponent
                            handleVideoFileData={handleVideoFileData}
                        />
                    </div>
                    <div className='w-full h-10p p-3'>
                        <OptionComponent
                            HandleUploadVideo={HandleUploadVideo}
                        />
                    </div>
                </div>
                <div className='w-1/4'>
                    <div className='bg-gray-100
                    px-2
                    py-2
                    text-black rounded-3xl shadow-xl w-full h-full overflow-y-auto'>
                        <ListComponent />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Index