import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GradientIconBackground from './GradientIconBackground';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcons from '../icons/CustomIcons';

interface BannerProps {
    EnableBlackHandler: boolean;
    imagelink_portrait: any;
    type: string;
    id: string;
    favourite: string;
    name: string;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_counter: string;
    roated: string;
    BackHandler?: any;
    ToggleFavourite: any;
}

const Banner: React.FC<BannerProps> = ({
    EnableBlackHandler,
    imagelink_portrait,
    type,
    id,
    favourite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_counter,
    roated,
    BackHandler,
    ToggleFavourite,
}) => {
    return (
        <View>
            <ImageBackground
                resizeMode={'cover'}
                style={styles.BackgroundImage}
                source={imagelink_portrait}>
                {EnableBlackHandler ?
                    (<View style={styles.NavigateBackContainer}>
                        <TouchableOpacity onPress={() => {
                            BackHandler()
                        }}>
                            <GradientIconBackground
                                name="left"
                                color={COLORS.primaryLightGreyHex}
                                size={FONTSIZE.size_16} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            ToggleFavourite(favourite, type, id)
                        }}>
                            <GradientIconBackground
                                name="like"
                                color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                                size={FONTSIZE.size_16} />
                        </TouchableOpacity>
                    </View>) : (
                        <View>
                            <TouchableOpacity onPress={() => {
                                ToggleFavourite(favourite, type, id)
                            }}>
                                <GradientIconBackground
                                    name="like"
                                    color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                                    size={FONTSIZE.size_16} />
                            </TouchableOpacity>
                        </View>
                    )}
                <View style={styles.OuterContainer}>
                    <View style={styles.InnerContainer}>
                        <View style={styles.InfoContainerRow}>
                            <View>
                                <Text style={styles.ItemTitleText}>
                                    {name}
                                </Text>
                                <Text style={styles.ItemSubTitleText}>
                                    {special_ingredient}
                                </Text>
                            </View>
                            <View style={styles.ItemPropertesContainer}>
                                <View style={styles.PropertyFirst}>
                                    <CustomIcons
                                        name={type == 'Bean' ? 'bean' : 'beans'}
                                        size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                                        color={COLORS.primaryOrangeHex} />
                                    <Text style={[styles.PropertyTextFirst,
                                    { marginTop: type == 'Bean' ? SPACING.space_4 + SPACING.space_2 : 0 }]}>
                                        {type}
                                    </Text>
                                </View>
                                <View style={styles.PropertyFirst}>
                                    <CustomIcons
                                        name={type == 'Bean' ? 'location' : 'drop'}
                                        size={FONTSIZE.size_16}
                                        color={COLORS.primaryOrangeHex} />
                                    <Text style={styles.PropertyTextFirst}>{ingredients}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Banner

const styles = StyleSheet.create({
    BackgroundImage: {
        aspectRatio: 20 / 25,
        width: '100%',
        justifyContent: 'space-between'
    },
    NavigateBackContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    NoNavigateBackContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    OuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
        borderTopRightRadius: BORDERRADIUS.radius_20 * 2
    },
    InnerContainer: {
        justifyContent: 'space-between',
        gap: SPACING.space_15
    },
    InfoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ItemPropertesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_20,
    },
    ItemTitleText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryWhiteHex

    },
    ItemSubTitleText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex
    },
    PropertyFirst: {
        height: 50,
        width: 50,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,

    },
    PropertyTextFirst: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_8,
        color: COLORS.primaryWhiteHex
    }
})