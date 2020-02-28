import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
/**
 * 此组件已经优化，解决内存溢出问题
 * @param {*} param0
 */
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
  let timeout = null;
  //新增变量标识组件是否已经销毁无法setState
  let sizeIdentiy = null;
  let isDestoried = false;
  function _loadImage() {
    let now = Date.now();

    sizeIdentiy = Image.getSize(
      uri,
      (w, h) => {
        if (w > maxImageWidth) {
          h = (maxImageWidth / w) * h;
          w = maxImageWidth;
        }
        let leftTime = 500 - (Date.now() - now);

        if (leftTime > 0) {
          timeout = setTimeout(() => {
            if (!isDestoried) {
              setSize({
                width: w,
                height: h,
              });
              setLoaded(true);
            }
          }, leftTime);
        } else {
          if (!isDestoried) {
            setSize({
              width: w,
              height: h,
            });
            setLoaded(true);
          }
        }
      },
      error => {
        if (!isDestoried) {
          setError(true);
        }
      },
    );
  }

  useEffect(() => {
    _loadImage();
    return () => {
      sizeIdentiy = null;
      isDestoried = true;
      if (__DEV__) {
        console.log('CustomImage组件已经销毁');
      }
      clearTimeout(timeout);
    };
  }, [uri]);

  if (loaded) {
    clearTimeout(timeout);
    return <Image source={{uri}} style={[style, size]} />;
  }
  if (error) {
    clearTimeout(timeout);
    return (
      <TouchableOpacity>
        <View style={[styles.container, size]}>
          <Icon name={iconName} size={60} style={styles.icon} />
          <Text style={styles.text} onPress={() => _loadImage()}>
            点击重新加载图片
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  clearTimeout(timeout);
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
