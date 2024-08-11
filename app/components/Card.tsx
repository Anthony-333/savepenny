import { View, Text } from 'react-native'
import React from 'react'
import { DataType } from '../../assets/data/data'

type Props = {
    item: DataType;
    index: number
}


const Card = ({item, index}: Props) => {
  return (
    <View className='absolute' style={{backgroundColor: item.backgroundColor}}>
      <Text>Card</Text>
    </View>
  )
}

export default Card