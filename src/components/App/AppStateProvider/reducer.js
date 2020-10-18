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

        case 'ANT_STOPPED':
        return {
            ...state,
            antStopped: payload,
        };

        case 'HEX_STRING':
        return {
            ...state,
            hexString: payload,
        };

        case 'SORTING_FRAMES':
        return {
            ...state,
            sortingFrames: payload,
        };

        case 'INSERTION_SORT':
        return {
            ...state,
            insertionSortDone: payload,
        };

        case 'GOLDS_SORT':
        return {
            ...state,
            goldsSortDone: payload,
        };

        case 'MERGE_SORT':
        return {
            ...state,
            mergeSortDone: payload,
        };

        case 'QUICK_SORT':
        return {
            ...state,
            quickSortDone: payload,
        };

        default:
            return state
    }
}
