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
            <div className=" bg-gray-900 min-h-screen w-screen flex flex-col px-5 py-10 gap-4 md:gap-6 md:flex-row md:h-screen">
                <div className='md:w-3/4 md:h-full   flex flex-col h-fit'>
                    <div className="bg-gray-100 md:rounded-3xl shadow-xl w-full md:h-90p h-64">
                        <VideoComponent
                            handleVideoFileData={handleVideoFileData}
                        />
                    </div>
                    <div className='w-full md:h-10p p-3'>
                        <OptionComponent
                            HandleUploadVideo={HandleUploadVideo}
                        />
                    </div>
                </div>
                <div className='md:w-1/4 '>
                    <div className='bg-gray-100
                    px-2
                    py-2
                    text-black rounded-3xl shadow-xl w-full min-h-32 md:h-full overflow-y-auto'>
                        <ListComponent />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Index