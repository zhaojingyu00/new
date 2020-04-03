import React, { Component } from 'react'
import {
    View, 
    Text, 
    AsyncStorage,
    Button,
    ScrollView,
    StatusBar,
    ToastAndroid,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Icon } from '@ant-design/react-native';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class LocalPage extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
            title:[],
            titles:[],
            create:[],
            h:[],
            hq:'',
            page:1
        }
    }
    getData = (page=1)=>{
        fetch('https://cnodejs.org/api/v1/topics?page='+page+'&limit=10')
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    tits:res.data
                })
            })
    }
    getIf =() =>{
           var m = parseInt(Math.random() * 2)
        if(m%2==0){
            this.setState({hq:'已回复'})
        }
        else{
            this.setState({hq:'未回复'})
        }
         
    }
    lastPage =(page=this.state.page-1) =>{
        if(page == 0){
            ToastAndroid.show('没有上一页', 20000)
        }
        else{
            fetch('https://cnodejs.org/api/v1/topics?page='+page+'&limit=10')
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    data: res.data,
                    page:page
                })
            })
        }
        
    }
    nextPage = (page) =>{
        page++;
        fetch('https://cnodejs.org/api/v1/topics?page='+page+'&limit=10')
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    data: res.data,
                    page:page
                })
            })
    }
    componentDidMount(page){
        fetch('https://cnodejs.org/api/v1/topics?page='+page+'&limit=10')
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    data: res.data
                });
            })
    }
        
    render() {
        const last=['已回复','待回复']
        const color=()=>{
            if(last[Math.floor(Math.random()*last.length)]=='待回复'){
                return <Text style={{color:'red'}}>待回复</Text>;
            }
            else{
                return <Text style={{color:'black'}}>已回复</Text>;
            }
        }
        return (
            <View>
                {/* 状态栏 */}
                <View style={styles.header}>
                    <Button title='返回' onPress={() => Actions.pop()}>
                    {/* <Image source={require('../../assets/self.png')} /> */}
                    <Icon name='left' size={20} color='#fff' />
                    </Button>
                    
                    <Text style={{color:"#fff",fontSize:25,marginLeft:120}}>我的发布</Text>
                </View>
                <StatusBar backgroundColor='transparent' translucent={true} backgroundColor='#f23030'/>
                <ScrollView>
                    <View style={{fontSize:35}}>
                    {
                        this.state.data.map((item)=>(
                            <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{width:300,fontSize:17,marginTop:7}}>{item.title?(item.title.length > 5 ? item.title.substr(0, 15) + "..." : item.title) : ""}</Text>
                                <Text style={{width:100}}>{item.create_at.slice(0,10)} </Text>
                                <Text style={{width:50}}>{color()}</Text>
                            </View>
                            <View style={{width:450,height:1,backgroundColor:'#000',marginTop:5,marginBottom:5}}></View>
                            </View>
                        ))
                    }
                    </View>
                    <View style={{flexDirection:'row',marginTop:30}}>
                        <Button title='上一页'
                         onPress={()=>{this.lastPage()}} 
                         style={{marginLeft:30}}
                         ></Button>
                        <Text style={{marginLeft:150,marginRight:150}}>第{this.state.page}页</Text>
                        <Button title='下一页' 
                        onPress={()=>{this.nextPage(this.state.page)}}
                        ></Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header:{
        height: 70*s,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1/3,
        backgroundColor:'#f23030',
        marginBottom:50*s,
        flexDirection:'row'
    }
})