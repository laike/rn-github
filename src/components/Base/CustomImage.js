import React, {useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
const CustomImage = ({
  style,
  uri,
  defaultSize = {width: 200, height: 200},
  maxImageWidth = 200,
  iconSize = 60,
  iconName = 'ios-images',
}) => {
  const [size, setSize] = useState(defaultSize);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  function _loadImage() {
    let now = Date.now();
    Image.getSize(
      uri,
      () => (w, h) => {
        if (w > maxImageWidth) {
          h = (maxImageWidth / w) * h;
          w = maxImageWidth;
        }
        let leftTime = 500 - (Date.now() - now);
        if (leftTime > 0) {
          setTimeout(() => {
            setSize({
              width: w,
              height: h,
            });
            setLoaded(true);
          }, leftTime);
        } else {
          setSize({
            width: w,
            height: h,
          });
          setLoaded(true);
        }
      },
      error => {
        setError(true);
      },
    );
  }
  _loadImage(); //加载图片
  if (loaded) {
    return <Image source={{uri}} style={[style, size]} />;
  }
  if (error) {
    return (
      <TouchableOpacity>
        <View style={[style.container, size]}>
          <Icon name={iconName} size={60} style={styles.icon} />
          <Text style={styles.text} onPress={() => _loadImage()}>
            点击重新加载图片
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container]}>
      <Icon name={iconName} size={iconSize} style={styles.icon} />
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
    margin: 10,
    position: 'relative',
  },
  icon: {
    color: 'rgba(0,0,0,0.5)',
  },
  text: {},
});
