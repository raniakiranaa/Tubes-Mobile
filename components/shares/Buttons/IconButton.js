import { StyleSheet, Image, View } from 'react-native';
import * as React from 'react';
import { Button } from 'react-native-paper';

export const IconButton = (props) => {
    
    return (
        <View style={styles.container}>
            <Button 
                icon={ props.iconSource } 
                mode="contained" 
                contentStyle={
                    props.type === 'right' ? styles.right : 
                    {}
                }
                // onPress={() => console.log('Pressed')}
                style={
                    props.size === 'primary-square' ? { width: 327, borderRadius:5 } :
                    props.size === 'primary' ? { width: 327 } :
                    props.size === 'large-square' ? { width: 112, borderRadius: 5 } :
                    props.size === 'large' ? { width: 112 } :
                    props.size === 'small-square' ? { width: 12, borderRadius: 5 } :
                    { width: 12 } // small
                }
            >
                { props.title }
            </Button>
        
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 48, 
    },
    right: {
        flexDirection:'row-reverse'
    }
  });