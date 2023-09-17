// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/

// import React in our code
import React, {useState, useRef, useEffect} from 'react';

// import all the components we are going to use
import {Button,  StyleSheet, Text, View} from 'react-native';

//Import React Native Video to play video
import Video from 'react-native-video';

//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

//const VideoPlayer = ({_uri, _type, _poster}:{_uri:string, _type:string, _poster:string}) => {
const VideoPlayer = ({_uri, _type, _poster}) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  //console.log("videoPlayer  currentTime ",currentTime, " paused ",paused);

  
  // useEffect(()=>{
  //   onLoadStart();
  //   videoPlayer.current.uri = "";
  //   videoPlayer.current.uri = _uri; 
  //   videoPlayer.current.poster = _poster;     
  //   console.log("useEffect _uri ",_uri," videopla ",videoPlayer.current)
  // },[_uri]);

  const onSeek = seek => {
    //Handler for change in seekbar
    console.log("onSeek ",seek);
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    //Handler for Video Pause
    console.log("onPaused ",paused," playerState ",playerState);
    setPaused(!paused);
    setPlayerState(playerState);

  };

  const onReplay = () => {
    //Handler for Replay
    console.log("onReplay ");
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
      //console.log("onProgress ",data);
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    console.log("onLoad ",data);
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') {
      setScreenType('cover');
    } else {
      setScreenType('content');
    }
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  return (
    <View style={{flex: 1}}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          //Ads
          //uri:"https://redirector.gvt1.com/videoplayback/id/f59fbc7a0cfbf059/itag/18/source/dclk_video_ads/requiressl/yes/acao/yes/mime/video%2Fmp4/ctier/L/ip/0.0.0.0/ipbits/0/expire/1694917586/sparams/ip,ipbits,expire,id,itag,source,requiressl,acao,mime,ctier/signature/0EE4F603A96132169FB4DA862F1A310F77794B64.36D6121FC2594DEE1D0DBB4F6CA2BD6F030DFC1A/key/ck2/file/file.mp4"
          //uri:"https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4"
          //uri: 'https://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8',
          //uri: 'https://5b48d7e1b4bce.streamlock.net/pratidintime/pratidintime/chunklist_w1369844922.m3u8', //Pratidin
          //uri: "https://5b48d7e1b4bce.streamlock.net/myapp/newslive/chunklist_w1991843395.m3u8"//News Live
          //uri: "https://nw18live.cdn.jio.com/bpk-tv/CNN_News18_NW18_MOB/output01/CNN_News18_NW18_MOB-audio_33635_eng=33600-video=148000.m3u8"
          uri: _uri
        }}
       // poster="https://www.pratidintime.com/favicon.ico" //Pratidin
       // poster="https://newslivetv.com/wp-content/uploads/2022/07/news-live-logo-2-300x131.png" //Pratidin 
        poster={_poster}       
        style={styles.mediaPlayer}
        volume={10}
      />
      {_type==="live" ?
          paused ? <Button onPress={()=> onPaused()} title='Play'/> :<Button onPress={()=> onPaused()} title='Pause'/>
        :<MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      /> }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    //position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    height: 200,
    width: "100%",
  },
});

export default VideoPlayer;
