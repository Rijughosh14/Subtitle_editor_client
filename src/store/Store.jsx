import {configureStore} from '@reduxjs/toolkit'
import subtitlesliceReducer from "../feature/Subtitles/SubtitleSlice"
import videosliceReducer from '../feature/Video/VideoSlice'

export const store=configureStore({
    reducer:{
        subtitles_VTT:subtitlesliceReducer,
        VideoSubtitle_Editor:videosliceReducer
    },
})