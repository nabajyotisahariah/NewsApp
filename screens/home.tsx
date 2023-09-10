import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import HomeSlider from '../components/HomeSlider';
import {HomepageStyle} from '../assets/StyleSheet';
import HomePostsDisplay from '../components/HomePageItemsLoader';
import constants from '../assets/constants';
import VideoPlayer from '../components/VideoPlayer';

//import { NODE_ENV, API_URL } from "@env";

//console.log("HOME NODE_ENV ",NODE_ENV, " =API_URL= ",API_URL, " =process.env= ",process.env);

//console.log("home  process ",process.env)
// const wait = ({timeout}: {timeout: number}) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// };

const Home = ({navigation}: {navigation: any}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={HomepageStyle.FullContainer}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{marginTop: 20, padding: 5, marginLeft: 10}}>
          <Text style={HomepageStyle.AppTitle}>Live TV</Text>
        </View>

        <VideoPlayer />

        <View style={{padding: 5, marginLeft: 10}}>
          <Text style={HomepageStyle.AppTitle}>{constants.APP_NAME}</Text>
        </View>
        <View>
          <HomeSlider navigation={navigation} refreshing={refreshing} />
        </View>

        <View>
          <View style={HomepageStyle.RecentNewsContainer}>
            <Text style={HomepageStyle.RecentNewsTitle}>
              {constants.RECENT_NEWS_TITLE}
            </Text>
            <HomePostsDisplay navigation={navigation} refreshing={refreshing} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Home;
