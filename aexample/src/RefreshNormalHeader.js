'use strict';
import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  Text,
  StyleSheet,
  Platform,
  RefreshControl
} from 'react-native';
import Dayjs from 'dayjs';
import { RefreshHeader } from 'react-native-refresh';

function NormalRefreshHeader(props) {
  const {
    style,
    refreshing,
    onPullingRefresh,
    onRefresh,
    onEndRefresh,
    onChangeOffset,
    forwardedRef,
  } = props;

  const [title, setTitle] = useState('下拉刷新');
  const [lastTime, setLastTime] = useState(Dayjs().format('HH:mm'));
  const rotateZRef = useRef(new Animated.Value(0));

  const onPullingRefreshCallBack = useCallback(
    (state) => {
      onPullingRefresh && onPullingRefresh(state);
      Animated.timing(rotateZRef.current, {
        toValue: -180,
        duration: 200,
        useNativeDriver: true,
      }).start(() => { });
      setTitle('松开立即刷新');
    },
    [onPullingRefresh],
  );

  const onRefreshCallBack = useCallback(
    (state) => {
      onRefresh && onRefresh(state);
      setLastTime(Dayjs().format('HH:mm'));
      setTitle('正在刷新...');
    },
    [onRefresh],
  );

  const onEndRefreshCallBack = useCallback(
    (state) => {
      onEndRefresh && onEndRefresh(state);
      Animated.timing(rotateZRef.current, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => { });
      setTitle('下拉刷新');
    },
    [onEndRefresh],
  );

  const buildStyles = useMemo(() => {
    return {
      style: [styles.container, style],
    };
  }, [style]);

  return (
    <RefreshHeader
      style={buildStyles.style}
      ref={forwardedRef}
      refreshing={refreshing}
      onChangeOffset={onChangeOffset}
      onPullingRefresh={onPullingRefreshCallBack}
      onRefresh={onRefreshCallBack}
      onEndRefresh={onEndRefreshCallBack}
    >
      <View style={styles.leftContainer}>
        <Animated.Image
          style={[
            styles.image,
            {
              opacity: refreshing ? 0 : 1,
              transform: [
                {
                  rotate: rotateZRef.current.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            },
          ]}
          source={require('./assets/icon_down_arrow.png')}
        />
        <ActivityIndicator
          animating={refreshing}
          size="small"
          hidesWhenStopped={true}
          color={'#666'}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.timeStyle}>{`最后更新：${lastTime}`}</Text>
      </View>
    </RefreshHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  titleStyle: {
    fontSize: 16,
    color: '#333',
  },
  timeStyle: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  leftContainer: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});



const MemoNormalRefreshHeader = React.memo(NormalRefreshHeader);

const ForwardNormalRefreshHeader = React.forwardRef((props, ref) => (
  <MemoNormalRefreshHeader forwardedRef={ref} {...props} />
));

ForwardNormalRefreshHeader.displayName = 'RefreshHeader';

export default React.memo(ForwardNormalRefreshHeader);