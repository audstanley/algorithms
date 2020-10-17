export default function (state, { type, payload }) {
    switch (type) {

        case 'FRAME_COUNT':
        return {
            ...state,
            frame: payload,
        };

        case 'FRAME_RATE':
        return {
            ...state,
            frameRate: payload,
        };

        case 'ANT_STOPPED':
        return {
            ...state,
            antStopped: payload,
        };

        default:
            return state
    }
}
