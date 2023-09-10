import React, {useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
//import constants from '../assets/constants';
import LottieView from 'lottie-react-native';
import {IReview} from '../redux/reviewAction';
import {useDispatch, useSelector} from 'react-redux';
//import { AppDispatch, StoreType } from '../redux/store';
import {AppDispatchToolKit, StoreToolKitType} from '../redux-toolkit/store';
import {fetchReviewHomeReduxTk} from '../redux-toolkit/reviewSlice';

//https://www.youtube.com/watch?v=afdcWiKdLgM
//ViewPropTypes will be removed from React Native along with all other PropTypes deprecated- fixed

//function HomeSlider({navigation, refreshing}) {
function HomeSlider({navigation}: {navigation: any}) {
  //const {loading, homeReview, error} = useSelector((state:StoreType) => state.review);
  const homeReview: IReview[] = useSelector(
    (state: StoreToolKitType) => state.review.homeReview,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch: AppDispatchToolKit = useDispatch();

  //console.log("HomeSlider ",homeReview," loading ",loading," error ",error);

  useEffect(() => {
    console.log('NewsHomeScreen...........');
    dispatch(fetchReviewHomeReduxTk(1, 3));

    return () => {};
  }, []);

  renderItem = ({item, index}: {item: IReview; index: number}) => {
    //console.log("HomeSlider.renderItem ",item)
    return (
      <View
        key={`carousel${item.id}`}
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderRadius: 20,

          height: 250,
          marginLeft: 16,
          backgroundColor: 'white',
          elevation: 20,
          marginBottom: 20,
          marginTop: 20,
          shadowColor: 'white',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Image
          style={{
            height: 150,
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          source={{uri: item.cover_image.url}}
          onPress={() =>
            navigation.navigate('StackReviewDetail', {postID: item.postId})
          }
        />

        <Text
          onPress={() =>
            navigation.navigate('StackReviewDetail', {postID: item.postId})
          }
          style={{
            fontSize: 14,
            padding: 12,
            marginTop: 20,
            fontFamily: 'poppins_semibold',
          }}>
          {item.headline}
        </Text>
      </View>
    );
  };

  if (homeReview.length > 1) {
    // const carouselItems = homeReview.map(function (x:IReview) {
    //   return {
    //     id: x.id,
    //     postId: x.postId,
    //     headline: x.headline,
    //     illustration: x?.cover_image?.url,
    //     ottplay_id: x.ottplay_id,
    //   };

    // });
    //console.log("carouselItems ",carouselItems);

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 20,
          backgroundColor: '#FBFEFB',
        }}>
        <Carousel
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={200}
          autoplayInterval={5000}
          layout={'default'}
          ref={ref => (this.carousel = ref)}
          data={homeReview}
          sliderWidth={100}
          itemWidth={350}
          renderItem={this.renderItem}
          onSnapToItem={index => setActiveIndex({activeIndex: index})}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
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

export default HomeSlider;
