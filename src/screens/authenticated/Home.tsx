import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'

const Home: React.FC = () => {
    return (
        <View className='bg-white rounded-2xl p-2 flex-1'>
            <Header />
            <Text className='m-5 font-bold text-lg'>Home</Text>
        </View>
    )
}

export default Home