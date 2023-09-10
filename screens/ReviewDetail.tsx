import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import constants from '../assets/constants';
import {NewsPageStyle} from '../assets/StyleSheet';
import LottieView from 'lottie-react-native';
import RenderHtml from 'react-native-render-html';
import NewsParseBody from './../components/NewsParseBody';

import {useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IReview, IReviewDetail, fetchReviewDetail} from '../redux/reviewAction';
import {AppDispatch, StoreType} from '../redux/store';
import {StoreToolKitType} from '../redux-toolkit/store';
import {fetchReviewDetailTK} from '../redux-toolkit/reviewSlice';

const dimensions = Dimensions.get('window');

function ReviewDetail({route, navigation}: {route: any; navigation: any}) {
  const [postData, setPostData] = useState({});

  const dispatch: AppDispatch = useDispatch();

  const detail: IReview[] = useSelector(
    (state: StoreToolKitType) => state.review.detail,
  );
  const error: string | null = useSelector(
    (state: StoreToolKitType) => state.review.error,
  );
  const review: IReview | null = detail ? detail[0] : null;

  console.log('datail ','detail ','news ',detail.length, ' error ',error);

  useEffect(() => {
    console.log('Redux fired.');
    //setLoading(false);

    dispatch(fetchReviewDetailTK(route.params.postID));
  }, []);

  const {Width} = useWindowDimensions();

  if (review != null) {
    return (
      <ScrollView style={NewsPageStyle.SingleNewsContainer}>
        <TouchableOpacity
          onPress={props => {
            navigation.goBack(null);
          }}
          style={{
            position: 'absolute',
            backgroundColor: constants.LIGHT_THEME_BG,
            margin: 10,
            zIndex: 1,
            height: 40,
            width: 40,
            borderRadius: 20,
            padding: 5,
          }}>
          <View>
            <Icon
              name="arrow-left"
              size={30}
              color={constants.LIGHT_THEME_PRIMARY_COLOR}
            />
          </View>
        </TouchableOpacity>

        <View
          style={NewsPageStyle.TextViewContainer}
          key={detail[0].ottplay_id}>
          <View style={NewsPageStyle.HeadlineContainer}>
            <Text style={NewsPageStyle.TitleTag}>{review.headline}</Text>
          </View>



          {detail?.[0]?.full_synopsis ? (
            <RenderHtml contentWidth={width} source={{html: review.synopsis}} />
          ) : null}

          <Image
            style={styles.storyImage}
            source={{uri: review?.cover_image?.url}}
          />

          {detail?.length > 0 ? (
            <NewsParseBody
              json={review}
              key={`reviewBody${review.ottplay_id}`}
            />
          ) : null}
        </View>
      </ScrollView>
    );
  } else {
    if (error != null) {
      return (
        <ScrollView style={NewsPageStyle.NewsDetailContainer}>
          <View style={{height: 400}}>
            <Text style={NewsPageStyle.TitleTag}>
              Something went wrong!!!!!!!!!
            </Text>
            <Button
              title="Home"
              color="#841584"
              onPress={props => {
                navigation.goBack(null);
              }}
            />
          </View>
        </ScrollView>
      );
    }
    else {
      return (
        <ScrollView style={NewsPageStyle.NewsDetailContainer}>
          <LottieView
            style={{width: 150, height: 200, margin: '16%'}}
            source={require('../assets/loading/newsload1.json')}
            autoPlay
            loop
          />
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    padding: 2,
  },
  scrollView: {
    backgroundColor: 'pink',
    //marginHorizontal: 20,
  },
  storyConatiner: {
    //flexDirection: 'row',
    padding: 10,
  },
  storyImage: {
    //flexDirection: 'row',
    height: 250,
    width: 400,
  },
  storyHeadline: {
    //flexDirection: 'row',
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  storySynopsis: {
    paddingLeft: 5,
    fontSize: 20,
  },
  storyText: {
    padding: 5,
    fontSize: 16,
  },
});

export default ReviewDetail;
