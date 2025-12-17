import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeft, Mail, Lock, Eye, EyeClosed } from 'lucide-react-native'
import LogoImage from "../../assets/logo.png"

const ForgotPassword: React.FC<{ navigation: any }> = ({ navigation }) => {

    const [step, setStep] = useState<number>(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handleSendOTP = () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email address");
            return;
        }
        Alert.alert("Success", "OTP has been sent to your email");
        setStep(2);
    }

    const handleVerifyOTP = () => {
        if (!otp) {
            Alert.alert("Error", "Please enter the OTP");
            return;
        }

        Alert.alert("Success", "OTP verified successfully");
        setStep(3);
    }

    const handleResetPassword = () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        Alert.alert("Success", "Password has been reset successfully");
        navigation.navigate("SignIn");
    }

    return (
        <View className='bg-white rounded-2xl p-2 flex-1'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text className="text-lg font-semibold mt-3">
                {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Reset Password"}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-5 bg-gray-200 p-4 rounded-2xl">
                    <View className='flex-row items-center justify-between'>
                        <Text className="text-emerald-600 font-bold">
                            {step === 1 ? "Reset Your Password" : step === 2 ? "Enter Verification Code" : "Create New Password"}
                        </Text>
                        <Image className='h-14 w-14 rounded-lg' source={LogoImage} alt='RaddiGo Logo' />
                    </View>

                    {/* Step 1: Email Input */}
                    {step === 1 && (
                        <>
                            <Text className="text-gray-600 mt-3 mb-3">
                                Enter your email address and we'll send you a verification code to reset your password.
                            </Text>
                            <View className="mt-3">
                                <Text className="font-semibold">Email</Text>
                                <View className="flex-row items-center justify-center mt-2 bg-white px-3 h-14 rounded-lg border border-gray-300">
                                    <Mail />
                                    <TextInput
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                        placeholder="Enter your email"
                                        placeholderTextColor="#9ca3af"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        className="flex-1 h-full px-2 py-1 font-bold text-emerald-500"
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={handleSendOTP}
                                className="bg-emerald-600 mt-6 rounded-full h-12 items-center justify-center">
                                <Text className="text-white font-bold text-lg">Send OTP</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {/* Step 2: OTP Input */}
                    {step === 2 && (
                        <>
                            <Text className="text-gray-600 mt-3 mb-3">
                                We've sent a verification code to {email}. Please enter the code below.
                            </Text>
                            <View className="mt-3">
                                <Text className="font-semibold">Verification Code</Text>
                                <View className="flex-row items-center justify-center mt-2 bg-white px-3 h-14 rounded-lg border border-gray-300">
                                    <TextInput
                                        value={otp}
                                        onChangeText={(text) => setOtp(text)}
                                        placeholder="Enter 6-digit code"
                                        placeholderTextColor="#9ca3af"
                                        keyboardType="number-pad"
                                        maxLength={6}
                                        className="flex-1 h-full px-2 py-1 font-bold text-emerald-500 text-center text-xl tracking-widest"
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={handleVerifyOTP}
                                className="bg-emerald-600 mt-6 rounded-full h-12 items-center justify-center">
                                <Text className="text-white font-bold text-lg">Verify Code</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSendOTP}
                                className="mt-4 justify-center">
                                <Text className="text-emerald-600 font-bold text-center">Resend Code</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {/* Step 3: New Password Input */}
                    {step === 3 && (
                        <>
                            <Text className="text-gray-600 mt-3 mb-3">
                                Create a strong password for your account.
                            </Text>
                            <View className="mt-3">
                                <Text className="font-semibold">New Password</Text>
                                <View className="flex-row items-center justify-center mt-2 bg-white px-3 h-14 rounded-lg border border-gray-300">
                                    <Lock />
                                    <TextInput
                                        secureTextEntry={!showPassword}
                                        value={newPassword}
                                        onChangeText={(text) => setNewPassword(text)}
                                        placeholder="Enter new password"
                                        placeholderTextColor="#9ca3af"
                                        className="flex-1 h-full px-2 py-1 font-bold text-emerald-500"
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="ml-2">
                                        {showPassword ? <Eye /> : <EyeClosed />}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className="mt-3">
                                <Text className="font-semibold">Confirm Password</Text>
                                <View className="flex-row items-center justify-center mt-2 bg-white px-3 h-14 rounded-lg border border-gray-300">
                                    <Lock />
                                    <TextInput
                                        secureTextEntry={!showConfirmPassword}
                                        value={confirmPassword}
                                        onChangeText={(text) => setConfirmPassword(text)}
                                        placeholder="Confirm new password"
                                        placeholderTextColor="#9ca3af"
                                        className="flex-1 h-full px-2 py-1 font-bold text-emerald-500"
                                    />
                                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-2">
                                        {showConfirmPassword ? <Eye /> : <EyeClosed />}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={handleResetPassword}
                                className="bg-emerald-600 mt-6 rounded-full h-12 items-center justify-center">
                                <Text className="text-white font-bold text-lg">Reset Password</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <View className="flex-row justify-center mt-5 ml-5">
                    <Text className="text-gray-600 font-semibold">Remember your password? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                        <Text className="text-emerald-600 font-bold">Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default ForgotPassword