import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';
import { Button, Text} from 'react-native-elements';
import Spacer from '../components/Spacer';

const TrackDetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext);
    
    const _id = navigation.getParam('_id');

    const track = state.find(t => t._id === _id);
    const initialCoords = track.locations[0].coords;
    
    return (
        <>
            <Spacer>
                <Text h2>{track.name}</Text>
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
                 <Spacer />
                <Button
                    title="Edit Track"
                    onPress={() => { navigation.navigate('TrackEdit', { _id: _id }) }} 
                />
            </Spacer>
        </>    
    )
};

TrackDetailScreen.navigationOptions = ({ navigation }) => {
   return {
       title: 'Track Details',
  };
};


const styles = StyleSheet.create({
    map: {
        height: 500
    },
});

export default TrackDetailScreen;
