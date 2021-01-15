import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';

export default () => {
    const { updateTrack } = useContext(TrackContext);
    const { state: { name, id } } = useContext(LocationContext);

    const updateCurrentTrack = async () => {
        await updateTrack(id, name);
        navigate('TrackList')
    }
    return [updateCurrentTrack];
};