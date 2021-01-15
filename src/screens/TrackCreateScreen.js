// Test this out with a physical device, Comment out mockLocation and walk.  
// import './_mockLocation'; 
import React, { useCallback, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import Spacer from '../components/Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons'

const TrackCreateScreen = ({ isFocused }) => {
    const { state: { recording }, addLocation } = useContext(LocationContext);
    const callback = useCallback(location => {
        addLocation(location, recording)
    }, [recording])
    const [err] = useLocation(isFocused || recording, callback);
    
    return (
        <SafeAreaView forceInset={{ top: 'always'}}>
            <Spacer>
                <Text h2>Create a Track</Text>
                <Map />
                {err ? <Text>Please Enable location services.</Text> : null}
            </Spacer>    
            <TrackForm />
        </SafeAreaView>    
    )
};

TrackCreateScreen.navigationOptions = () => {
  return {
      title: 'Add Track',
      tabBarIcon: <FontAwesome name='plus' size={20} />
  };
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);