import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeft, Mail, Lock, Eye, User, Phone } from 'lucide-react-native'
import { GoogleIcon, FacebookIcon } from '../../assets/Icons'

const SignUp: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <View className='bg-white rounded-2xl p-2 flex-1'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text className="text-lg font-semibold mt-3">Create Account</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-5 bg-gray-200 p-4 rounded-2xl">
                    <Text className="text-emerald-600 font-bold">Sign up to RaddiGo</Text>

                    <View className="mt-3">
                        <Text className="font-semibold">Username</Text>
                        <View className="flex-row items-center justify-center mt-2 bg-white px-3 h-14 rounded-lg border border-gray-300">
                            <User />
                            <TextInput
                                placeholder="Enter your username"
                                placeholderTextColor="#9ca3af"
                                className="flex-1 h-full px-2 py-1 font-bold text-emerald-500"
                            />
                        </View>
                    </View>

                    <View className="mt-3">
                        <Text className="font-semibold">Email</Text>
                        <View className="flex-row items-center justify-center mt-2 bg-white px-3 h-14 rounded-lg border border-gray-300">
                            <Mail />
                            <TextInput
                                placeholder="Enter your email"
                                placeholderTextColor="#9ca3af"
                                className="flex-1 h-full px-2 py-1 font-bold text-emerald-500"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>

                    <View className="mt-3">
                        <Text className="font-semibold">Phone</Text>
                        <View className="flex-row items-center justify-center mt-2 bg-white px-3 h-14 rounded-lg border border-gray-300">
                            <Phone />
                            <TextInput
                                placeholder="Enter your phone number"
                                placeholderTextColor="#9ca3af"
                                className="flex-1 h-full px-2 py-1 font-bold text-emerald-500"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    <View className="mt-3">
                        <Text className="font-semibold">Password</Text>
                        <View className="flex-row items-center justify-center mt-2 bg-white px-3 h-14 rounded-lg border border-gray-300">
                            <Lock />
                            <TextInput
                                placeholder="Enter your Password"
                                placeholderTextColor="#9ca3af"
                                className="flex-1 h-full px-2 py-1 font-bold text-emerald-500"
                                secureTextEntry
                            />
                            <Eye />
                        </View>
                    </View>

                    <TouchableOpacity className="bg-emerald-600 mt-6 rounded-full h-12 items-center justify-center">
                        <Text className="text-white font-bold text-lg">Sign Up</Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center my-5">
                        <View className="flex-1 h-[1px] bg-gray-400" />
                        <Text className="text-gray-400 font-semibold mx-3">OR</Text>
                        <View className="flex-1 h-[1px] bg-gray-400" />
                    </View>

                    <TouchableOpacity className="flex-row items-center justify-center bg-white border-2 border-emerald-600 rounded-full h-12 mb-3">
                        <GoogleIcon />
                        <Text className="text-emerald-600 font-bold text-base ml-2">Continue with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center justify-center bg-white border-2 border-emerald-600 rounded-full h-12">
                        <FacebookIcon />
                        <Text className="text-emerald-600 font-bold text-base ml-2">Continue with Facebook</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-5 ml-5 mb-5">
                    <Text className="text-gray-600 font-semibold">Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                        <Text className="text-emerald-600 font-bold">Log In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp