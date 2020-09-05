export default function (state, { type, payload }) {
    switch (type) {
        case 'SET_BGND_COLOR':
            return {
                ...state,
                bgndColor: payload,
            }

        case 'FRAME_COUNT':
        return {
            ...state,
            frame: payload,
        }

        case 'SET_PLAY_AUDIO':
            return {
                ...state,
                playAudio: payload,
            }

        case 'SET_SLIDER_VALUE':
            return {
                ...state,
                slider: payload,
            }

        case 'TOGGLE_PLAY_AUDIO':
            console.log("PLAYING AUDIO", "yoyo");
            return {
                ...state,
                playAudio: !state.playAudio,
            }

        case 'TOGGLE_SKETCH':
            return {
                ...state,
                [payload.key]: payload.value,
            }

        default:
            return state
    }
}
