import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import Banner from '../../components/Banner'
import { useStore } from '../../store/store'
import CustomIcons from '../../icons/CustomIcons'

const Detail = ({ navigation, route }: any) => {
  const ItemOfIndex = useStore((state: any) => route.params.type == 'Coffee' ?
    state.CoffeeList : state.BeanList,)[route.params.index];

  const addToFavoriteList = useStore((state: any) => state.addToFavorites);
  const deleteFromFavourites = useStore((state: any) => state.deleteFromFavorites);

  const Backhandler = () => {
    navigation.pop();
  };

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavourites(type, id) : addToFavoriteList(type, id);
  };

  return (
    <View style={styles.DetailContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}></StatusBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollContainer}>
        <Banner
          EnableBlackHandler={true}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_counter={ItemOfIndex.ratings_countr}
          roated={ItemOfIndex.roated}
          BackHandler={Backhandler}
          ToggleFavourite={ToggleFavourite}>
        </Banner>
      </ScrollView>
    </View>
  )
}

export default Detail

const styles = StyleSheet.create({
  DetailContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollContainer: {
    flexGrow: 1
  }
})