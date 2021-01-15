import React, { useContext } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';
import { Feather } from '@expo/vector-icons';

const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks, deleteTrack } = useContext(TrackContext);

    return <>
        <NavigationEvents onWillFocus={fetchTracks} />
        <FlatList
            data={state}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => { 
                        navigation.navigate('TrackDetail', { _id: item._id })
                    }} >
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <TouchableOpacity  onPress={() => deleteTrack(item._id)} >
                                <Feather style={styles.icon} name="trash" />
                            </TouchableOpacity>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                )
            }} 
        />
    </>
};

TrackListScreen.navigationOptions = () => {
  return {
    title: 'Tracks',
  };
};

const styles = StyleSheet.create({
    icon: {
        fontSize: 18,
    },
});

export default TrackListScreen;