
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
	Dimensions
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Input from '@ant-design/react-native/lib/input-item/Input';
const {width,scale} = Dimensions.get('window');
const s = width / 640;

const goods = [
    {
        title: '居家维修保养',
        img: require('../../assets//xiu.png'),
        rig: require('../../assets/jiantou.png')
    },
    {
        title: '住宿优惠',
        img: require('../../assets/flag.png'),
        rig: require('../../assets/jiantou.png')
    },
    {
        title: '出行接送',
        img: require('../../assets/lock.png'),
        rig: require('../../assets/jiantou.png')
    },
    {
        title: 'E族活动',
        img: require('../../assets/gift.png'),
        rig: require('../../assets/jiantou.png')
    },
]

export default class Test extends Component {
    constructor(){
        super();
        this.state = {
            tits: []
        }
    }
    render() {
        return (
            <View
             style={{flex: 1,backgroundColor: '#f5f5f5'}}
             >
                 <StatusBar backgroundColor='red'/>
                <View style={{
                    backgroundColor:'#f23030',
                    height:60
                    }}>
                    {/* <Image source={require('../assets/header.png')} style={{marginBottom:20}}/> */}
                    <View style={{
                        width:'80%',
                        backgroundColor:'#fbb8b8',
                        // justifyContent: 'center',
                        marginLeft:25,
                        marginTop:20,
                        alignItems: 'center',
                        borderRadius:10,
                        flexDirection:'row'}}
                    >
                        <Image source={require('../../assets/search.png')} style={{justifyContent:'center'}} />
                            <TextInput 
                                placeholder="请输入名称"
                                style={{
                                    width: 490*s,height: 50*s,
                                    padding: 0,
                                    paddingLeft: 10
                                }}
                            />
                            <Image source={require('../../assets/shop.png')}/>
                    </View>
                    
                        
                </View>
                <FlatList 
                    style={{backgroundColor: '#F4F4F4'}}
                    data={goods}
                    numColumns={1}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:80*s,marginTop: 60*s}}
                            />
                            <Text
                                style={{marginTop: 40,width:90}}
                            >{item.title}</Text>
                            <Image 
                                resizeMode="contain"
                                source={item.rig}
                                style={{height:80*s,marginTop: 60*s,marginLeft:280*s}}
                            />
                        </View>
                    )}
                />
                <View style={{
                    width:'70%',
                    height:50,
                    backgroundColor:'#f23030',
                    borderRadius:10,
                    marginLeft:55,
                    marginTop:30
                }}
                >
                    <Text style={{
                        color:'#fff',
                        paddingTop:10,
                        paddingLeft:105,
                        fontSize:22
                    }}
                    >发布需求</Text>
                </View>
                <Text style={{
                    fontSize:15,
                    color:'#767676',
                    paddingLeft:150,
                    paddingTop:12
                }}>E族之家  版权所有</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    good:{
        width:'95%',
        backgroundColor: '#fff',
        marginLeft: 20*s,
        marginTop: 20*s,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        alignItems: 'center',
        flexDirection:'row'
    }
})
