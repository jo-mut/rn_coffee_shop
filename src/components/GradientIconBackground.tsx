import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../theme/theme'
import LinearGradient from 'react-native-linear-gradient'
import CustomIcons from '../icons/CustomIcons'

interface GradientIconBackgroundProps {
    name: string;
    color: string;
    size: number;
}

const GradientIconBackground: React.FC<GradientIconBackgroundProps> = ({ name, color, size }) => {
    return (
        <View style={styles.Container}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.LinearGradient}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
                <CustomIcons name={name} color={color} size={size} />
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryDarkGreyHex
    },
    LinearGradient: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default GradientIconBackground;


