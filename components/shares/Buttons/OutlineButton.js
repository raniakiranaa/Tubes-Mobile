import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { Button } from 'react-native-paper';

export const OutlineButton = (props) => {
  
  return (
    <View style={styles.container}>
      <Button 
        mode = 'outlined'
        buttonColor = { props.buttonColor }
        textColor = { props.textColor }
        // onPress={ props.onPress }
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
});