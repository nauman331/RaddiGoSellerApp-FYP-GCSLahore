import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfilePic from "../assets/logo.png"
import { Bell } from "lucide-react-native"
import { useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const Header: React.FC = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <View className='w-full bg-white py-4 px-4 flex-row items-center justify-between'>
            <View className='flex-row items-center'>
                <Image
                    source={ProfilePic}
                    alt="Profile Picture"
                    className='w-12 h-12 rounded-full border-2 border-gray-300'
                />
                <View className='ml-2'>
                    <Text className='text-lg font-semibold'>Hi Nauman</Text>
                    <Text className='text-sm text-gray-600'>Rider</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={handleLogout}
                className='bg-gray-100 border-2 border-gray-300 p-2 rounded-full relative'>
                <Bell size={16} color="#4B5563" />
                <View style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    backgroundColor: '#EF4444',
                    borderRadius: 10,
                    width: 15,
                    height: 15,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text className='text-white text-xs font-bold'>3</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Header