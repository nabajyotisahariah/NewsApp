import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import HomeSlider from '../components/HomeSlider';
import {CategoriesStyleSheet, HomepageStyle} from '../assets/StyleSheet';
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
  const [defaultData, setDefaultData] = useState([{}]);
  const [data, setData] = useState({});

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
  }, []);

  const loadData = () => {
    const defaultData1 = [
      {
        _name:"News Live",
        _uri:"https://5b48d7e1b4bce.streamlock.net/myapp/newslive/chunklist_w1991843395.m3u8", 
        _type:"live",
        _poster:"https://newslivetv.com/wp-content/uploads/2022/07/news-live-logo-2-300x131.png" 
      },
      {
        _name:"Pratidin Times",
        _uri:"https://5b48d7e1b4bce.streamlock.net/pratidintime/pratidintime/chunklist_w1369844922.m3u8", 
        _type:"live",
      _poster:"https://www.pratidintime.com/favicon.ico" 
      },
      {
        _name:"Ads",
        _uri:"https://redirector.gvt1.com/videoplayback/id/f59fbc7a0cfbf059/itag/18/source/dclk_video_ads/requiressl/yes/acao/yes/mime/video%2Fmp4/ctier/L/ip/0.0.0.0/ipbits/0/expire/1694917586/sparams/ip,ipbits,expire,id,itag,source,requiressl,acao,mime,ctier/signature/0EE4F603A96132169FB4DA862F1A310F77794B64.36D6121FC2594DEE1D0DBB4F6CA2BD6F030DFC1A/key/ck2/file/file.mp4", 
        _type:"ads",
        _poster:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-e346bzgdins/gallery/in-galaxy-f34-6gb-ram-sm-e346bzgdins-537686681?$2052_1641_PNG$https://www.pratidintime.com/favicon.ico" 
      },
      {
        _name:"Video Clip",
        _uri:"https://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8", 
        _type:"video",
        _poster:"https://images-cf.ottplay.com/images/dffdaf2c902749d7a42b02bd2377c461.jpg?format=webp&width=1939&quality=25" 
      },
    ];
    setData(defaultData1[0]);
    setDefaultData(defaultData1);
    
  };

  useEffect(()=>{
    loadData();
  },[])

  const DataConstant = defaultData.map(function (x) {
    return (
      <TouchableOpacity
        onPress={()=>setData({_uri:x._uri, _type:x._type, _poster:x._poster })}
        key={x._name}
        style={CategoriesStyleSheet.TagContainerVideo}>
        <Text style={CategoriesStyleSheet.TagText}>{x._name}</Text>
      </TouchableOpacity>
    );
  });



  return (
    <SafeAreaView style={HomepageStyle.FullContainer}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{padding: 5, marginLeft: 10}}>
          <Text style={HomepageStyle.AppTitle}>Live TV</Text>
          {
            data.hasOwnProperty('_uri') ?
              <VideoPlayer 
                _uri={data._uri} 
                _type={data._type} 
                _poster={data._poster} /> 
              : <Text>Loading....</Text>
          }
          <View style={CategoriesStyleSheet.AllCategorieTagsVideo}>{DataConstant}</View>
       </View>

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
