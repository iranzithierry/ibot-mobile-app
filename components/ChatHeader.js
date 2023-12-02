import { View, Text, Image, Pressable } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, TrashIcon, XMarkIcon , CheckIcon as CheckIconOutline} from 'react-native-heroicons/outline'
import { CheckCircleIcon as CheckIconSolid} from 'react-native-heroicons/solid'
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import Context from '../context/context'
import { storeData } from '../utils/asyncStorage';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';


export default function ChatHeader() {
    const navigation = useNavigation()
    const [isChecked, setChecked] = useState(false);
    const { selectingActive, setSelectingActive, selected, setSelected, message, setMessage } = useContext(Context);
    const deleteSelected = () => {
        if (selected.length > 0) {
            let newList = message.filter(item => !selected.includes(item))
            setMessage(newList)
            storeData('messages', JSON.stringify(newList))

            setSelected([])
            setSelectingActive(false)
            setChecked(false)
        }
    }
    const cancelSelection = async () => {
        setSelectingActive(false);
        setSelected([]);
        setChecked(false)
    }
    const selectAll = useCallback(async () => {
        if (selected.length === message.length) {
            setSelected([]);
            setSelectingActive(false);
            setChecked(false);
        } else {
            setSelected(message);
            setChecked(true);
        }
    }, [selected, message, setSelectingActive, setSelected, setChecked ])

    useEffect(() => {
        if(selectingActive){
            if (selected.length === message.length) {
                setChecked(true)
            } else {
                setChecked(false)
            }
        }
    }, [selectingActive, selected])
    return (
        <View className='flex flex-row justify-between w-full items-center px-1'>
            <View>
                <Button backgroundColor='#E2E8F0' borderRadius='rounded-full' classNameArg='p-3 ml-2' onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={20} color={'#005e38'} />
                </Button>
            </View>
            {!selectingActive ? (
                <View className='flex flex-col justify-start'>
                    <Text className='text-xl text-center font-sans_bold text-slate-800'>
                        iBot
                    </Text>
                    <View className='h-1.5 w-1.5 bg-green-500 rounded-full absolute bottom-1.5 -left-2.5' />
                    <Text className='text-slate-600 text-center font-sans_bold text-xs'>
                        Online
                    </Text>
                </View>
            ) : (
                <Animated.View exiting={FadeOutUp.delay(100).duration(500).springify()} entering={FadeInUp.delay(100).duration(500).springify()} className='flex flex-row justify-center items-center'>
                    <Button backgroundColor='#E2E8F0' borderRadius='rounded-full' classNameArg='py-2.5 px-5 ml-2' onPress={() => deleteSelected()}>
                        <Text className='text-slate-600 text-center font-sans_bold text-base'>
                            {selected.length}
                        </Text>
                    </Button>
                    <Button backgroundColor='#E2E8F0' borderRadius='rounded-full' classNameArg='p-3 ml-2' onPress={() => deleteSelected()}>
                        <TrashIcon size={20} color={'#005e38'} />
                    </Button>
                    <Button backgroundColor='#E2E8F0' borderRadius='rounded-full' classNameArg='p-3 ml-2' onPress={() => cancelSelection()}>
                        <XMarkIcon size={20} color={'#005e38'} />
                    </Button>
                    <Button backgroundColor='#E2E8F0' borderRadius='rounded-full' classNameArg='p-3 ml-2' onPress={() => selectAll()}>
                        {isChecked ? <CheckIconSolid size={20} color={'#005e38'} /> : <CheckIconOutline size={20} color={'#005e38'} />}
                    </Button>
                </Animated.View>
            )}
            <Pressable className='rounded-full  border border-slate-200' onPress={() => navigation.navigate("HomeScreen")}>
                <Image
                    source={require('../assets/bot.png')}
                    style={{ width: wp(15), height: wp(15) }}
                    className='rounded-full'
                />
            </Pressable>
        </View>
    )
}