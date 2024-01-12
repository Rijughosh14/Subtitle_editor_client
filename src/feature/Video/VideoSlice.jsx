import { createSlice} from "@reduxjs/toolkit";


const initialState={
    VideoStatus:{
        CurrentVideo:'',
    },
    EditorStatus:false
}


export const videoSlice=createSlice({
    name:'VideoSubtitle_Editor',
    initialState,
    reducers:{

        //changing editor status
        eDITOR:(state,action)=>
        {
            return{
                ...state,EditorStatus:action.payload.value
            }
        },

        //adding a video file url

        AddVideo:(state,action)=>{
            return{
                ...state,
                VideoStatus:{
                    CurrentVideo:action.payload.value
                }
            }
        },

        ResetState:()=>{
            return{
                VideoStatus:{
                    CurrentVideo:'',
            
                },
                EditorStatus:false
            }
        }
        
    }
})


export default videoSlice.reducer

export const {eDITOR,AddVideo,ResetState}=videoSlice.actions