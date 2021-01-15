import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
    const { state: { name, recording, locations }, startRecording, stopRecording, changeName } = useContext(LocationContext);
    const [saveTrack] = useSaveTrack();

    return (
        <>
            <Spacer>
                <Input placeholder="Enter Track Name" onChangeText={changeName} value={name} autoCapitalize='none' autoCorrect={false} />
                {!recording
                    ? <Button title="Start Recording" onPress={startRecording} />
                    : <Button title="Stop" onPress={stopRecording} />
                }
                <Spacer />  
                {!recording && locations.length
                    ? <Button title="Save Track" onPress={saveTrack} />
                    : null
                }
            </Spacer>    
        </>
    )
 };

const styles = StyleSheet.create({ });

export default TrackForm;