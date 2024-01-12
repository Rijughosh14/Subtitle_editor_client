import axios from 'axios'
import { WebVTTParser } from 'webvtt-parser';
 //import vttToJson from 'vtt-to-json'


  //uploading video to the cloudinary (cloudstorage)

   const Video_upload = (file) => {
    return new Promise(async (resolve, reject) => {
        try {
            const formdata=new FormData();
            formdata.append("file",file)
            const res=await axios.post('/videoUpload',formdata,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            })
            return resolve(res.data)
        } catch (error) {
            return reject(error.message)
        }
    })
}

//uploading vttfile
   const Vtt_upload = (file,name) => {
    return new Promise(async (resolve, reject) => {

        if(file.length<1) return resolve('')
        try {

            const res=await axios.post('/vttUpload',{
                file:file,
                name:name
            })
            return resolve(res.data)
        } catch (error) {
            return reject(error.message)
        }
    })
}

  //uploading video and vtt file reference in DB
  export   const upload = (videofile,vttfile) => {
    return new Promise(async (resolve, reject) => {
        try {
          const VideoResponse=await Video_upload(videofile)
          const VttResponse=await Vtt_upload(vttfile,videofile.originalname)

       const response= await axios.post('/uploadData',{
            VideoUrl:VideoResponse,
            VttUrl:VttResponse
          })

          return resolve(response.data)
                      
        } catch (error) {
            return reject(error.message)
        }
    })
}

  //updating video's  vtt file reference in DB
  export   const update = (videofile,vttfile) => {
    return new Promise(async (resolve, reject) => {
        try {
          const VttResponse=await Vtt_upload(vttfile,videofile.originalname)

        const response=  await axios.post('/updateData',{
            VideoUrl:videofile,
            VttUrl:VttResponse
          })

          return resolve(response.data)

        } catch (error) {
            return reject(error.message)
        }
    })
}

const SecondToTime=(sec_num)=>{
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}


export const ParsingVttContent=async(someVTT)=>{
 var data=[]
const parser = new WebVTTParser();
const response=await axios.get(someVTT)
const tree = parser.parse(response.data, 'metadata');

tree.cues.forEach((d)=>{
    const list={
        start:SecondToTime(d.startTime),
        end:SecondToTime(d.endTime),
        caption:d.text
    }
    data.push(list)
})

return data
}