import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientIconBackground from './GradientIconBackground'
import Avatar from './Avatar'

interface HeaderBarProps {
    title?: string
}


const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.HeaderContainer}>
      <GradientIconBackground name='menu' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16}/>  
      <Text style={styles.HeaderText}>{title}</Text>
      <Avatar/>
    </View>
  )
}

const styles = StyleSheet.create({
    HeaderContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryWhiteHex
    }
})

export default HeaderBar