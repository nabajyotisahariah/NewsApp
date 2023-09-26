import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import constants from '../assets/constants';
import LottieView from 'lottie-react-native';
import {CategoriesStyleSheet} from '../assets/StyleSheet';

const Categories = ({navigation}: {navigation: any}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const data = [
      {catname: 'news', catid: 100, name: 'Latest News', id: 100},
      {catname: 'review', catid: 200, name: 'Latest Review', id: 101},
      {catname: 'listicle', catid: 200, name: 'Latest Photos', id: 102},
      {catname: 'sports', catid: 200, name: 'Latest Sports', id: 103},
    ];
    setCategories(data);
  };

  const DataConstant = categories.map(function (x) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CategoryView', {
            catname: x.name,
            catid: x.id,
            catname: x.catname,
          })
        }
        key={x.id}
        style={CategoriesStyleSheet.TagContainer}>
        <Text style={CategoriesStyleSheet.TagText}>{x.name}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView>
      <View style={CategoriesStyleSheet.CategoryPage}>
        <Text style={CategoriesStyleSheet.heading}>Categories</Text>

        <ScrollView
          style={{backgroundColor: constants.LIGHT_THEME_LIGHT_BLUE_BG}}>
          <View style={CategoriesStyleSheet.AllCategorieTags}>
            {categories.length < 1 ? (
              <LottieView
                style={{width: 150, height: 200, margin: '16%'}}
                source={require('../assets/loading/newsload1.json')}
                autoPlay
                loop
              />
            ) : (
              DataConstant
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Categories;
