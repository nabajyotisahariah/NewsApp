import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import YoutubePlayer from 'react-native-youtube-iframe';

const NewsParseBody = ({json}) => {
  //console.log('NewsParseBody =json= ', json);

  const {width} = useWindowDimensions();

  const [playing, setPlaying] = useState(false);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);

    () => {
      setLoading(false);
      setPlaying(false);
    };
  }, []);

  /*const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
        Alert.alert("video has finished playing!");
      }
    }, []);

    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);*/

  return json
    ? json.body.map((t, key) => {
        // console.log('=== ', key, ' t ', t);

        if (t && t?.content && t?.content != 'undefined') {
          if (t.type == 'paragraph' && t?.content) {
            return (
              <RenderHtml
                key={`${t.ottplay_id}_${t.order}`}
                source={{html: t.content}}
                style={styles.storyText}
                contentWidth={width}
              />
            );
          }
          if (t.type == 'video' && t?.content) {
            return isLoading && t?.content ? (
              <YoutubePlayer
                key={`${t.ottplay_id}_${t.order}`}
                height={300}
                play={playing}
                videoId={t?.content
                  .replace('https://youtu.be/', '')
                  .replace('https://www.youtube.com/watch?v=', '')}
                //onChangeState={onStateChange}
                resumePlayAndroid={false}
              />
            ) : (
              <Text>Loading...</Text>
            );
          }
          if (t.type == 'embedded') {
            return isLoading && t?.content ? (
              <RenderHtml
                key={`${t.ottplay_id}_${t.order}`}
                source={{html: t.content}}
                style={styles.storyText}
                contentWidth={width}
              />
            ) : (
              <Text>Loading...</Text>
            );
          }
          if (t.type == 'image') {
            return isLoading && t?.content ? (
              <Image
                key={`${t.ottplay_id}_${t.order}`}
                source={{uri: t.content}}
                width={width}
                height={250}
              />
            ) : (
              <Text>Loading...</Text>
            );
          }
        }
      })
    : null;
};

const styles = StyleSheet.create({
  storyText: {
    padding: 5,
    fontSize: 16,
  },
});

export default NewsParseBody;
