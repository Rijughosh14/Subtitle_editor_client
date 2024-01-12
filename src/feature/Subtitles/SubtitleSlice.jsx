import { createSlice} from "@reduxjs/toolkit";


const initialState={
    SubtitleVtt:[],
    SubtitleLink:'',
    SubtitleTimestamp:null
}

export const subtitleSlice=createSlice({
    name:'subtitles_VTT',
    initialState,
    reducers:{

        //setting subtitle
        SetVTT:(state,action)=>{
            return{
                ...state,
                SubtitleVtt:action.payload.parsedVtt
            }

        },
        //adding a subtitle 
        vTT:(state,action)=>
        {
            return {
              ...state,
              SubtitleVtt:[
                    ...state.SubtitleVtt,
                    {
                        start:action.payload.startTime,
                        end:action.payload.endTime,
                        caption:action.payload.caption
                    }
                ]
            }

        },
        //updating a subtitle selection
        SelectSubtitle:(state,action)=>{
            return{
                ...state,
                SubtitleTimestamp:action.payload.d
            }
        }
        ,
        //deleting a particular subtitle
        deleteSubtitle:(state,action)=>{
            const indexTodelete=action.payload.i
            const updatedsubtitle=state.SubtitleVtt.filter((_,index)=>index!==indexTodelete)
            return{
                ...state,
                SubtitleVtt:updatedsubtitle
            }
        },

        //setting the vtt link
        AddVttLink:(state,action)=>{
            return{
                ...state,
                SubtitleLink:action.payload.value
            }
        },

        //clearing the subtitles
        RemoveSubtitle:()=>{
            return{
                SubtitleVtt:[],
                SubtitleLink:'',
                SubtitleTimestamp:null
            }
        }
        
    }
})


export default subtitleSlice.reducer

export const {vTT,AddVttLink,SetVTT,RemoveSubtitle,SelectSubtitle,deleteSubtitle}=subtitleSlice.actions