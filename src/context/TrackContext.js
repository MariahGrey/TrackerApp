import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tracks':
            return action.payload;
        case 'update_track':
            return state.map((track) => track.id == action.payload.id ? action.payload : track);
        case 'delete_track':
            return state.filter((track) => track.id !== action.payload)
        default: 
            return state;
    }
}

const fetchTracks = dispatch => async () => { 
    const response = await trackerApi.get('/tracks');
    dispatch({ type: 'fetch_tracks', payload: response.data })
};
const createTrack = dispatch => async (name,locations) => {
    await trackerApi.post('/tracks', { name, locations });
};
 const updateTrack = dispatch => {
    return async (id, name, callback) => {
        await trackerApi.put(`/tracks/${id}`, { name })
        dispatch({
            type: 'update_track',
            payload: { id, name },
        });
        if (callback) {
            callback();
        }
    }
};
const deleteTrack = dispatch => {
    console.log('deleting track');
    return async (id) => {
        console.log('id to delete: ', id);
        try {
            await trackerApi.delete(`tracks/${id}`)
            dispatch({ type: 'delete_track', payload: id })
        } catch (err) {
            console.log('error ', err)
        }
       
    }
};
export const { Provider, Context } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack, updateTrack, deleteTrack },
    []
)