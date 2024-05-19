import { StyleSheet, Image, View } from 'react-native';
import * as React from 'react';
import { Button } from 'react-native-paper';
import { SCREEN_WIDTH } from '../../../utils/deviceDimensions';

export const IconButton = (props) => {
    const primaryWidth = SCREEN_WIDTH * 0.872;
    const largeWidth = SCREEN_WIDTH * 0.3;


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
                style={[
                    props.size === 'primary-square' ? { width: primaryWidth, height: 44, borderRadius:5 } :
                    props.size === 'primary' ? { width: primaryWidth, height: 44 } :
                    props.size === 'large-square' ? { width: largeWidth, borderRadius: 5 } :
                    props.size === 'large' ? { width: largeWidth } :
                    props.size === 'small-square' ? { width: 12, borderRadius: 5 } :
                    { width: 12 }, // small
                    {backgroundColor: props.buttonColor}
                ]}
                labelStyle={{color: props.textColor}}
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