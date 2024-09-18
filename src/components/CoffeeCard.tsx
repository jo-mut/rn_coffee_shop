import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcons from '../icons/CustomIcons';
import BGIcon from './BGIcon';

const CARD_WIDTH: number = Dimensions.get('window').width * 0.32;

interface CoffeeCard {
    id: string;
    index: string;
    type: string;
    roasted: string;
    imagelink_square: any;
    name: string;
    special_ingredient: string;
    average_rating: string;
    price: any;
    buttonPressHandler: any;
}

const CoffeeCard: React.FC<CoffeeCard> = ({
    id,
    index,
    type,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler }) => {
    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.LinearGradientContainer}>
                <ImageBackground
                    source={imagelink_square}
                    style={styles.CardImageBG}
                    resizeMode={'cover'}>
                    <View style={styles.CoffeeRatingContainer}>
                        <CustomIcons
                            name='star'
                            color={COLORS.primaryOrangeHex}
                            size={SPACING.space_10} />
                        <Text style={styles.CoffeeRating} >{average_rating}</Text>
                    </View>
                </ImageBackground>
                <Text style={styles.CoffeeTitle}>{name}</Text>
                <Text style={styles.CoffeeSubTitle}>{special_ingredient}</Text>
                <View style={styles.CardFooter}>
                    <Text style={styles.CurrencyContainer}>$
                        <Text style={styles.Price}>{price}</Text>
                    </Text>
                    <TouchableOpacity>
                        <BGIcon
                            name='add'
                            color={COLORS.primaryWhiteHex}
                            size={SPACING.space_10}
                            BGColor={COLORS.primaryOrangeHex}></BGIcon>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}

export default CoffeeCard

const styles = StyleSheet.create({
    LinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: SPACING.space_20,
    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden'
    },
    CoffeeRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        color: COLORS.primaryWhiteHex,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
    },
    CoffeeRating: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        lineHeight: 22,
        color: COLORS.primaryWhiteHex,
    },
    CoffeeTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    CoffeeSubTitle: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    CurrencyContainer: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryOrangeHex,
        gap: SPACING.space_10,
    },
    Price: {
        color: COLORS.primaryWhiteHex,
    },
    CardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15
    }
})