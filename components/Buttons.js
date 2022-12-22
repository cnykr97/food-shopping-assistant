import { View, Text, TouchableOpacity, Image} from 'react-native'
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants'

export const CircularButton = ({imgUrl, handlePress, ...props}) => {
    return(
        <TouchableOpacity style={{
            width: props.width,
            height: props.height,
            backgroundColor: COLORS.white,
            position: "absolute",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            ...SHADOWS.dark,
            ...props
        }}
        onPress= { handlePress }
        >
            <Image source={imgUrl} resizeMode="contain" style={{width: props.width*(3/4), height: props.height*(3/4)}} />
        </TouchableOpacity>
    )
}


export const RectangularButton = ({text, handlePress, minWidth, ...props}) => {
    return(
        <TouchableOpacity style={{
            backgroundColor: COLORS.secondary,
            color: COLORS.white,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            minWidth: minWidth,
            padding: SIZES.small,
            ...SHADOWS.light,
            ...props
        }}
        onPress= { handlePress }
        >
            <Text style={{
                fontFamily: FONTS.semiBold,
                color: COLORS.white,
                textAlign: "center"
            }} >
                {text}
            </Text>
        </TouchableOpacity>
    )
}