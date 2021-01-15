import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import MapView, { Polyline } from 'react-native-maps';
import Spacer from '../components/Spacer';
import { FontAwesome5 } from '@expo/vector-icons';


const TrackEditScreen = ({ navigation }) => {
    const { state, updateTrack } = useContext(TrackContext);
    const { changeName } = useContext(LocationContext);
    const _id = navigation.getParam('_id');

    const track = state.find(t => t._id === _id);
    const initialCoords = track.locations[0].coords;
    
    return (
        <>
            <Spacer>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        ...initialCoords,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }}
                >
                <Polyline
                    coordinates={track.locations.map(loc => loc.coords)}     
                />
                </MapView>  
                <Spacer>
                    <Input onChangeText={changeName} value={track.name} autoCapitalize='none' autoCorrect={false} />
                    <Button title="Update Track" onPress={(name) => updateTrack(name, id, () => navigation.pop())} />
                </Spacer>    
            </Spacer>    
        </>    
    )
};

TrackEditScreen.navigationOptions = () => {
  return {
      title: 'Edit Track',
      tabBarIcon: <FontAwesome5 name="hammer" size={20} />
  };
};

const styles = StyleSheet.create({
    map: {
        height: 500
    }
});

export default TrackEditScreen;
