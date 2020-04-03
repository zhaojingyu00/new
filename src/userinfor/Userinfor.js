import React, { Component } from 'react'
import {
    SafeAreaView,
	StyleSheet,
	View,
	Text,
	Image,
	TextInput,
	Button,
	ScrollView,
	ImageBackground,
	StatusBar,
	TouchableOpacity,
	FlatList,
	SectionList,
    Dimensions,
    Animated,
    AsyncStorage
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Router, Scene,Actions} from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

export default class Test extends Component {
    constructor(){
        super();
        this.state = {
            tits: [],
            data,
            width: new Animated.Value(20),
            imageUrl:''
        }
        let data = [];
        for(var i=0; i<10; i++){
            data.push({tit:i,key:i});
        }
    }
    takephoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
              const source = { uri: response.uri };
              this.setState({
                imageUrl: source,
              });
              var storeImg=async ()=>{
                const sources = JSON.stringify(source);
                await AsyncStorage.setItem('imgUrl',sources,
                ()=>{console.log('success')}
                )}
                storeImg();
            }
          });
    }
    exit = () => {
        AsyncStorage.clear();
        Actions.login();
    }
    componentDidMount(){
            AsyncStorage.getItem('imgUrl')
            .then((res)=>{
                this.setState({
                    imageUrl:JSON.parse(res)
                })
            })
    }
    render() {
        return (
            <>
            <ScrollView>
            <View style={{flex: 1,backgroundColor: '#fff'}}>
                <StatusBar backgroundColor='red'/>
                {/* <Image source={require('../assets/001.png')} style={{
                    width:640*s,
                    height:800*s
                }}/> */}
                <View style={{width:640*s,
                    height:400*s,
                    backgroundColor:'#f23030'}}>
                        <View style={{width:width,height:220,backgroundColor:'#f23030',marginLeft:180,marginTop:80}}>
                            <TouchableOpacity  onPress={()=>{this.takephoto()}}>
                                <Image style={{width:100,height:100,backgroundColor:'#fff'}} source={this.state.imageUrl}/>           
                            </TouchableOpacity>
                    <Text  style={{color:'white',fontSize:18,marginTop:10}}>BINNU DHILLON</Text>
                </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../../assets/1.png')}/>
                    <Text style={{marginTop:15,marginLeft:10}}>我的个人中心</Text>
                </View>
                <View style={{width:'100%',height:1,backgroundColor:'#fff'}}/>
                <View style={{
					flexDirection:'row',
					justifyContent:"space-evenly",
					flexWrap:'wrap',
                    backgroundColor:'#fff',
                    marginLeft:30
				}}>
                    <View style={styles.box}>
                        <Image source={require('../../assets/2.png')}/>
                        <Text style={{marginTop:10}}>账户管理</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/3.png')}/>
                        <Text style={{marginTop:10}}>收货地址</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/4.png')}/>
                        <Text style={{marginTop:10}}>我的信息</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/5.png')}/>
                        <Text style={{marginTop:10}}>我的订单</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/6.png')}/>
                        <Text style={{marginTop:10}}>我的二维码</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/7.png')}/>
                        <Text style={{marginTop:10}}>我的积分</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/8.png')} style={{marginLeft:-145}}/>
                        <Text style={{marginTop:10,marginLeft:-145}}>我的收藏</Text>
                    </View>
                </View>
                <View style={{width:'100%',height:10,backgroundColor:'#eee'}}/>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../../assets/9.png')}/>
                    <Text style={{marginTop:15,marginLeft:10}}>E族活动</Text>
                </View>
                <View style={{width:'100%',height:1,backgroundColor:'#fff'}}/>
                <View style={{
					flexDirection:'row',
					justifyContent:"space-evenly",
					flexWrap:'wrap',
					backgroundColor:'#fff',
                    marginLeft:30
				}}>
                    <View style={styles.box}>
                        <Image source={require('../../assets/10.png')}/>
                        <Text style={{marginTop:10}}>居家维修保养</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/11.png')}/>
                        <Text style={{marginTop:10}}>出行接送</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/12.png')}/>
                        <Text style={{marginTop:10}}>我的受赠人</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/13.png')}/>
                        <Text style={{marginTop:10}}>我的住宿优惠</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/14.png')}/>
                        <Text style={{marginTop:10}}>我的活动</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={require('../../assets/15.png')}/>
                        <Text onPress={()=>{Actions.mylist()}}>我的发布</Text>
                    </View>
                </View>
                <View style={{height:55,width:'100%',backgroundColor:'#eeeeee'}}/>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    width: '80%',
                                    height: 40,
                                    backgroundColor: '#f23030',
                                    marginTop: 30,
                                    marginBottom:30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius:5,
                                    marginLeft:45
                                }}
                                onPress={this.exit}>
                                <Text style={{color:'#fff'}}>退出登录</Text>
                            </TouchableOpacity>
            </View>
            </ScrollView>
            </>
            
        )
    }
}
const styles = StyleSheet.create({
    box:{
        width:'30%',
        marginLeft:10,
        backgroundColor:'#fff'
    }
})