import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../../store/store'
import { styles } from '../home/Style'
import { COLORS, FONTSIZE } from '../../theme/theme';
import HeaderBar from '../../components/HeaderBar';
import CustomIcons from '../../icons/CustomIcons';
import CoffeeCard from '../../components/CoffeeCard';
import BeanCard from '../../components/BeanCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


const getCategories = (data: any) => {

  let temp: any = {}
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1
    } else {
      temp[data[i].name]++
    }

    let categories = Object.keys(temp);
    categories.unshift('All');
    console.log(categories)
    return categories;
  };
};

const getSortedCoffeeList = (category: any, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
}


const Home = ({ navigation }: any) => {
  const coffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [categories, setCategories] = useState(getCategories(coffeeList));
  const [searchText, setSearchText] = useState('');
  const [sortedCoffee, setSortedCoffee] = useState(getSortedCoffeeList(categories, coffeeList))
  const [categoryIndex, setCategoryIndex] = useState({ index: 0, category: categories[0] })
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <HeaderBar></HeaderBar>
        <Text style={styles.screenTitle}>
          Find the best {'\n'}coffee for you
        </Text>
        <View style={styles.InputContainer}>
          <TouchableOpacity style={styles.InputIcon}>
            <CustomIcons
              name='search'
              size={FONTSIZE.size_18}
              color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          </TouchableOpacity>
          <TextInput
            placeholder='Find your coffee'
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer} />
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoriesContainer}>
          {categories?.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.CategoryContainer}>
              <TouchableOpacity
                style={styles.CategoryItem}
                onPress={() => {
                  setCategoryIndex({ index: index, category: categories[index] })
                  setSortedCoffee(getSortedCoffeeList(categories[index], coffeeList))
                }}>
                <Text style={[
                  styles.CategoryText,
                  categoryIndex.index == index ?
                    { color: COLORS.primaryOrangeHex } :
                    { color: COLORS.primaryLightGreyHex }]}>
                  {data}
                </Text>
                {categoryIndex.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : (<></>)}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            console.log(item.prices)
            return <TouchableOpacity
              onPress={() => {
                navigation.navigate('Detail', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                });
              }}>
              <CoffeeCard
                name={item.name}
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[0].price}
                buttonPressHandler={''} />
            </TouchableOpacity>
          }}
        />

        <Text style={styles.FlatlistTitle}>Coffee Beans</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[styles.FlatListContainer, { marginBottom: tabBarHeight }]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            console.log(item.prices)
            return <TouchableOpacity
              onPress={() => {
                navigation.push('Detail', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                });
              }}>
              <BeanCard
                name={item.name}
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[0].price}
                buttonPressHandler={''} />
            </TouchableOpacity>
          }}
        />
      </ScrollView>
    </View >
  );
};

export default Home