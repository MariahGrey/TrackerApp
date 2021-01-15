import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation';

const NavLink = ({ navigation, text, routeName }) => {
    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
                <Spacer>
                    <Text style={styles.link}>
                        {text}
                    </Text>
                </Spacer>
            </TouchableOpacity> 
        </>    
    )
};
 
const styles = StyleSheet.create({
    link: {
        color: '#838383',
        marginLeft: 45,
    }
});

export default withNavigation(NavLink);

