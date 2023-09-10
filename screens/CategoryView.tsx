import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, RefreshControl, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import NewsCard from '../components/NewsCard';
import LottieView from 'lottie-react-native';
import constants from '../assets/constants';
//import { INews, fetchNewsListing } from '../redux/newsAction';
import {useDispatch, useSelector} from 'react-redux';
//import { StoreType } from '../redux/store';
import {StoreToolKitType} from '../redux-toolkit/store';
import {fetchNewsListingReduxKT} from '../redux-toolkit/newsSlice';

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function ViewCategory({route, navigation}: {route: any; navigation: any}) {
  //const ViewCategory = ({route, navigation}) => {
  const [AllPostData, SetPostData] = useState([]);
  const [PostPageCount, SetPostPageCount] = useState(1);
  const [PostLimitReached, SetLimitReached] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const {loading, listingNews, error} = useSelector(
    (state: StoreToolKitType) => state.news,
  );
  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    //   setRefreshing(true);
    // LoadPostData();
    // wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    console.log('NewsHomeScreen...........');
    dispatch(fetchNewsListingReduxKT(PostPageCount, 5)).then(() => {
      SetPostPageCount(PostPageCount => PostPageCount + 1);
    });

    return () => {};
  }, []);

  const UpdateCards = async () => {
    dispatch(fetchNewsListingReduxKT(PostPageCount, 5)).then(() => {
      UpdatePageCount(PostPageCount => PostPageCount + 1);
    });
  };

  const DataConstant = listingNews.map(function (x: INews) {
    //console.log("x ",x);
    return (
      <NewsCard
        id={`categoryNewsId-${route.params.catname}-${x.id}`}
        postId={x.postId}
        title={x.title}
        image={x.cover_image.url}
        cat={x.cat}
        navigation={navigation}
        key={`categoryNewsId-${route.params.catname}-${x.id}`}
      />
    );
  });

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <Text
            style={{
              marginTop: 22,
              marginLeft: 20,
              textAlign: 'left',
              fontFamily: constants.PRIMARY_FONT_BOLD,
              fontSize: 24,
              marginBottom: 40,
            }}>
            {route.params.catname}
          </Text>
          {listingNews.length > 0 ?
            <View>
              {DataConstant}

              {/*listingNews < 1 ? (*/}
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}>
                <Text
                  onPress={() => UpdateCards()}
                  style={{
                    backgroundColor: '#D7263D',
                    width: 100,
                    textAlign: 'center',
                    padding: 10,
                    color: '#FFFFFF',
                    fontFamily: constants.PRIMARY_FONT_MEDIUM,
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
              {/*) : (
                // Else
                <Text
                  style={{
                    fontFamily: constants.PRIMARY_FONT_BOLD,
                    textAlign: 'center',
                    marginBottom: 20,
                  }}>
                  No more posts to display
                  </Text>)
              }*/}
            </View>
          : (
            <LottieView
              style={{"width": 200, "height": 200, "margin": '16%'}}
              source={require('../assets/loading/newsload1.json')}
              autoPlay
              loop
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ViewCategory;
