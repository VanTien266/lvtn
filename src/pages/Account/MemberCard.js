import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useSelector } from "react-redux";
import StepIndicator from 'react-native-step-indicator';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const DEFAULT_PADDING_HORIZONTAL = 16;
export const DEFAULT_PADDING_VERTICAL = 16;
export const ITEM_PADDING_VERTICAL = 8;
export const DEVICE_WIDTH = deviceWidth;
export const DEVICE_HEIGHT = deviceHeight;
export const BORDER_RADIUS = 6;
export const BORDER_RADIUS_BUTTON = 6;
export const BORDER_RADIUS_TEXT_INPUT = 6;
const COLOR_BACKGROUND = '#fff';

const labels = ["Tiêu chuẩn","Bạc","Vàng","Bạch Kim"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#000040',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#000040',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#000040',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#000040',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: '#000040',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 14,
  currentStepLabelColor: '#000040',
}



function MemberCard() {
    const user = useSelector((state) => state.session).user;
    const [index, setIndex] = React.useState(0);
    const StandardScreen = () => (
        <View style={{flex: 1}}>
            <Text>Điểm yêu cầu: 0</Text>
        </View>
    );
    const SilverScreen = () => (
        <View style={{flex: 1}} >
            <View style={{flexDirection: 'row'}}>
                <Text>Điểm yêu cầu: 100. {' '}</Text>
                <Text>Bạn cần {100 - user?.point} để đạt hạng Bạc</Text>
            </View>
            <Text>Bạn được giảm giá 7% khi mua hàng</Text>
        </View>
    );
    const  GoldScreen = () => (
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
                <Text>Điểm yêu cầu: 500. {' '}</Text>
                <Text>Bạn cần {500 - user?.point} để đạt hạng Vàng</Text>
            </View>
            <Text>Bạn được giảm giá 10% khi mua hàng</Text>
        </View>
    );
    const PlatinumScreen = () => (
        <View style={{flex: 1}} >
          <View style={{flexDirection: 'row'}}>
                <Text>Điểm yêu cầu: 2000. {' '}</Text>
                <Text>Bạn cần {2000 - user?.point} để đạt hạng Bạch Kim</Text>
            </View>
            <Text>Bạn được giảm giá 15% khi mua hàng</Text>
        </View>
    );
    const [routes] = React.useState([
        { key: 'StandardScreen', title: 'Tiêu chuẩn' },
        { key: 'SilverScreen', title: 'Bạc' },
        { key: 'GoldScreen', title: 'Vàng' },
        { key: 'PlatinumScreen', title: 'Bạch Kim' },
    ]);
    const renderScene = SceneMap({
        StandardScreen: StandardScreen,
        SilverScreen: SilverScreen,
        GoldScreen: GoldScreen,
        PlatinumScreen: PlatinumScreen,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'white'}
            inactiveColor={'black'}
            style={{}}
        />
    );

    

    return (
        <ScrollView style={styles.container}>
            <View style={styles.qrCodeAndCouponWrapper}>
                <View style={styles.qrCodeWrapper}>
                    <Image source={{uri: 'https://devapi.qrcode-gen.com/generate/2022_04/1653770615.png'}} style={styles.qrCodeImage} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.remindText}>{user?._id}</Text>
                    <Text style={styles.remindText}>
                        {user?.name}
                    </Text>
                    <Text style={styles.remindText}>Đưa mã này cho nhân viên khi thanh toán</Text>
                </View>
            </View>
            <View style={styles.rankCard}>
                <Text style={styles.titleReward}>
                    Điểm thưởng khả dụng là: {' '}
                    <Text style={[styles.pointText, styles.textWithColor]}>
                        {user?.point}
                    </Text>
                </Text>
                <Text style={styles.titleReward}>
                    Tổng điểm thưởng đã tích lũy là: {' '}
                <Text
                    style={[
                    styles.pointText,
                    styles.textWithColor,
                    ]}>{user?.point}</Text>
                </Text>
                <Text style={styles.titleReward}>
                    Thành viên: {' '}
                    <Text bold style={[styles.pointText, styles.textWithColor]}>
                        Tiêu chuẩn
                    </Text>
                </Text>
            </View>
            <StepIndicator
                    customStyles={customStyles}
                    currentPosition={0}
                    labels={labels}
                    stepCount={4}
                />
            <View style={{paddingHorizontal: 16, marginVertical: 16, height: '100%' , paddingBottom: 48}} >
                <Text style={{fontSize: 16, fontWeight: 'bold', color:'#000040'}}>Lợi ích hạng thành viên</Text>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={{ width: DEVICE_WIDTH }}
                />
            </View>
        </ScrollView>  
    )
}

export default React.memo(MemberCard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    qrCodeWrapper: {
        margin: DEFAULT_PADDING_HORIZONTAL,
        padding: DEFAULT_PADDING_HORIZONTAL,
        backgroundColor: '#000',
        borderRadius: BORDER_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: DEVICE_WIDTH / 2,
        height: DEVICE_WIDTH / 2,
    },
        qrCodeImage: {
          width: DEVICE_WIDTH / 2.5,
          height: DEVICE_WIDTH / 2.5,
        },
        qrCodeAndCouponWrapper: {
          backgroundColor: '#fff',
          paddingBottom: DEFAULT_PADDING_HORIZONTAL,
          flex: 1,
        },
        rankCard: {
          margin: DEFAULT_PADDING_HORIZONTAL,
          padding: DEFAULT_PADDING_HORIZONTAL,
          backgroundColor: COLOR_BACKGROUND,
          borderRadius: BORDER_RADIUS,
          alignItems: 'center',
        },
        remindText: {
            textAlign: 'center',
            fontSize: 16
          },
        titleReward: {
          paddingBottom: DEFAULT_PADDING_HORIZONTAL / 2,
          alignSelf: 'flex-start',
        },
    //     comingRankText: {
    //       alignSelf: 'flex-end',
    //       color: COLOR_PRIMARY,
    //       paddingTop: DEFAULT_PADDING_HORIZONTAL / 2,
    //     },
        rankNameText: {
          alignSelf: 'flex-start',
          paddingBottom: DEFAULT_PADDING_HORIZONTAL / 2,
        },
        pointText: {
          alignSelf: 'flex-start',
          color: '#000',
          paddingVertical: DEFAULT_PADDING_HORIZONTAL / 2,
          fontWeight: '700',
        },
    //     blank: {
    //       height: scalePortrait(30),
    //     },
   
        textWithColor: {
          color: '#000',
        },
    //     rank: (width, progress) => ({
    //       left: scalePortrait(width * progress),
    //       position: 'absolute',
    //       bottom: scalePortrait(12),
    //       alignItems: 'center',
    //     }),
    //     triangle: (color) => ({
    //       width: 0,
    //       height: 0,
    //       backgroundColor: 'transparent',
    //       borderStyle: 'solid',
    //       borderLeftWidth: scalePortrait(5),
    //       borderRightWidth: scalePortrait(5),
    //       borderBottomWidth: scalePortrait(10),
    //       borderLeftColor: 'transparent',
    //       borderRightColor: 'transparent',
    //       borderBottomColor: color,
    //       transform: [{rotate: '180deg'}],
    //       position: 'absolute',
    //     }),
    //     upTriangle: (color) => ({
    //       width: 0,
    //       height: 0,
    //       backgroundColor: 'transparent',
    //       borderStyle: 'solid',
    //       borderLeftWidth: scalePortrait(5),
    //       borderRightWidth: scalePortrait(5),
    //       borderBottomWidth: scalePortrait(10),
    //       borderLeftColor: 'transparent',
    //       borderRightColor: 'transparent',
    //       borderBottomColor: color,
    //       position: 'absolute',
    //     }),
    //     rankRow: {
    //       flexDirection: 'row',
    //     },
    //     yourRank: (width, progress) => ({
    //       left: progress > 1 ? scalePortrait(width) : scalePortrait(width * progress),
    //       position: 'absolute',
    //       bottom: scalePortrait(-2),
    //       alignItems: 'center',
    //     }),
    //     yourRankText: (color) => ({
    //       bottom: scalePortrait(-30),
    //       position: 'absolute',
    //       color: color,
    //     }),
      
    //     rankText: (color) => ({
    //       bottom: scalePortrait(0),
    //       position: 'absolute',
    //       color: color,
    //     }),
    //     info: {
    //       marginBottom: scalePortrait(10),
    // },
    listStyle: {
        flex: 1,
        marginTop: 20,
        marginLeft: 20
      },
})