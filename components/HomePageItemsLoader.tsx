import React, {useState, useEffect} from 'react';
import {Text, View, RefreshControl} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import constants from '../assets/constants';
import NewsCard from './NewsCard';
import LottieView from 'lottie-react-native';

import {useSelector, useDispatch} from 'react-redux';
//import {fetchNewsHome} from '../redux/newsAction';
//import { AppDispatch, StoreType } from '../redux/store';
import {INews} from '../redux/newsAction';
import {setHome, fetchNewsHomeReduxToolKit} from '../redux-toolkit/newsSlice';
import {AppDispatchToolKit, StoreToolKitType} from '../redux-toolkit/store';

function HomePostsDisplay({navigation}: {navigation: any}) {
  //function HomePostsDisplay({navigation}) {
  const [posts, setPosts] = useState([]);
  const [pageCount, UpdatePageCount] = useState(1);
  const [HomePageLimit, SetHomePageLimit] = useState(0);

  const homeNews: INews[] = useSelector((state: StoreToolKitType) => state.news.homeNews);

  //const {loading, homeNews, error} = useSelector( (state) => state.news);
  const dispatch: AppDispatchToolKit = useDispatch();
  //const dispatch = useDispatch();

  //console.log("ToolKit ",homeNews)
  useEffect(() => {
    console.log('NewsHomeScreen....11111.......');
    // dispatch(fetchNewsHome(pageCount, 5)).then( () => {
    //   UpdatePageCount(pageCount=>pageCount+1);
    // });

    dispatch(fetchNewsHomeReduxToolKit(pageCount, 5)).then(response => {
      //console.log('NewsHomeScreen....222222.......',response);
      UpdatePageCount(pageCount => pageCount + 1);
    });


    return () => {};
  }, []);

  const UpdateCards = async () => {
    dispatch(fetchNewsHomeReduxToolKit(pageCount, 5)).then(response => {
      //console.log('NewsHomeScreen....222222.......',response);
      UpdatePageCount(pageCount => pageCount + 1);
    });
  };

  if (homeNews.length > 1) {
    return (
      <ScrollView>
        <View>
          {homeNews.map(function (x: INews) {
            return (
              <NewsCard
                id={'homeNewsId'+x.id}
                postId={x.postId}
                title={x.title}
                image={x.cover_image.url}
                cat={x.cat}
                navigation={navigation}
                key={'homeNewsId'+x.id}
              />
            );
          })}

          {/*HomePageLimit < 1 ? (
            <TouchableOpacity style={{alignItems: 'center'}}>
              <Text
                onPress={() => UpdateCards()}
                style={{
                  backgroundColor: constants.LIGHT_THEME_PRIMARY_COLOR,
                  width: 100,
                  textAlign: 'center',
                  padding: 10,
                  color: '#FFFFFF',
                  fontFamily: constants.PRIMARY_FONT_SEMI_BOLD,
                  borderRadius: 10,
                  marginBottom: 20,
                  shadowColor: 'white',
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,
                  elevation: 9,
                }}>
                Load More
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                fontFamily: constants.PRIMARY_FONT_MEDIUM,
                textAlign: 'center',
                marginBottom: 20,
              }}>
              No more posts to display
            </Text>
            )*/}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <LottieView
          style={{width: 10, height: 100, marginLeft: '28%'}}
          source={require('../assets/loading/newsload1.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
}


export default HomePostsDisplay;
