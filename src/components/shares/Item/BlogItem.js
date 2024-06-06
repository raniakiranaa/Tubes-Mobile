import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MyTheme from '../../../config/theme';

function BlogItem({ image, title, description, date, vendor_name, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
        <View className='flex-row items-center p-2' style={ MyTheme.shadows.shadow_1 }>
            <Image source={{ uri: image }} style={{ height: 50, width: 50 }} />
            <View style={styles.blogCard}>
                <Text style={[MyTheme.typography.subtitle.sub_4, { color: MyTheme.colors.black }]}>{title}</Text>
                <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.brown_3 }]}>{description}</Text>
                <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.neutral_1, marginTop: 3 }]}>
                {date}  —  {vendor_name}
                </Text>
            </View>
        </View>
    </TouchableOpacity> 
  )
}

const styles = {
    blogCard: {
        padding: 8,
    },
}

export default BlogItem