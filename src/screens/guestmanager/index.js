import React, { useState } from 'react';
import { View, Text, StyleSheet,  ScrollView, Touchable, TouchableOpacity, Dimensions } from 'react-native';
import MyTheme from '../../config/theme.js';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import Pencil from '../../../assets/icons/Pencil/index.js'
import { Yes, No, None } from '../../../assets/icons/budget'
import { Guest } from '../../components/private/budget/index.js'

const GuestManager = () => {
  const [guestCount, setGuestCount] = useState(0)
  const [deadline, setDeadline] = useState('13 January 2024')
  const [yes, setYes] = useState(0)
  const [no, setNo] = useState(0)
  const [none, setNone] = useState(0)

  const handlePress = () => {
    console.log("Button Pressed");
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={MyTheme.typography.subtitle.sub_2}>
            {guestCount}
            {guestCount > 1 ? ' Guests' : ' Guest'}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 8, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[{color: MyTheme.colors.neutral_2p, marginRight: 12}, MyTheme.typography.body.body_2]}>Deadline :</Text>
            <View style={styles.outline}>
                <Text style={[{color: MyTheme.colors.brown_2}, MyTheme.typography.body.body_2]}>{deadline}</Text>
            </View>
            <Pencil width={20} height={20}/>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center', justifyContent: 'center' }}>
        <Yes width={15} height={15}/>
        <Text style={[{color: MyTheme.colors.neutral_2p, marginRight: 120}, MyTheme.typography.body.body_2]}> : {yes} </Text>
        <No width={15} height={15}/>
        <Text style={[{color: MyTheme.colors.neutral_2p, marginRight: 120}, MyTheme.typography.body.body_2]}> : {no} </Text>
        <None width={15} height={15}/>
        <Text style={[{color: MyTheme.colors.neutral_2p}, MyTheme.typography.body.body_2]}> : {none} </Text>
      </View>
      <ScrollView style={styles.guest}>
        {/* guest list */}
        <Guest/>
      </ScrollView>
      <View style={{ marginBottom: 24 }}>
        <CustomButton
          title="Add Guest"
          size="block-round"
          buttonColor={MyTheme.colors.brown_2}
          textColor={MyTheme.colors.white}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 24,
  },
  outline: {
    borderWidth: 0.5,
    width: 140,
    height: 24,
    borderRadius: 180,
    borderColor: MyTheme.colors.brown_2,
    backgroundColor: 'rgba(255, 218, 194, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2
  },
  guest: {
    marginTop: 42
  }

});

export default GuestManager;
