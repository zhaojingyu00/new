import React, { Component } from 'react';
import { View, Text, Image, TextInput, AsyncStorage, TouchableOpacity, BackHandler,ToastAndroid } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions, Router } from 'react-native-router-flux';
import { myFetch } from '../utils'
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            pwd: '',
            isloading: false,
            now:0
        }
    }
    userhandle = (text) => {
        this.setState({ username: text })
    }
    pwdhandle = (text) => {
        this.setState({ pwd: text })
    }
    login = () => {
        // myFetch.get('/topics',{limit:4,user:'sss'})
        //     .then(res=>console.log(res))
        this.setState({ isloading: true })
        myFetch.post('/login', {
            username: this.state.username,
            pwd: this.state.pwd
        }
        ).then(res => {
            // 根据返回状态进行判断，正确时跳转首页
            // if(res){

            // }
            AsyncStorage.setItem('user', JSON.stringify(res.data))
                .then(() => {
                    this.setState({ isloading: false })
                    Actions.lightbox();
                })
        })
    }
    zhuce = () => {
        // myFetch.get('/topics',{limit:4,user:'sss'})
        //     .then(res=>console.log(res))
        this.setState({ isloading: true })
        myFetch.post('/zhuce', {
            username: this.state.username,
            pwd: this.state.pwd
        }
        ).then(res => {
            // 根据返回状态进行判断，正确时跳转首页
            // if(res){

            // }
            AsyncStorage.setItem('user', JSON.stringify(res.data))
                .then(() => {
                    this.setState({ isloading: false })
                    Actions.login();
                })
        })
    }
    render() {
        BackHandler.addEventListener('back', () => {
            if (Actions.currentScene != 'homePage' && Actions.currentScene != 'login') {
                Actions.pop();
                return true;
              }
              else {
                if (new Date().getTime() - this.state.now < 2000) {
                  BackHandler.exitApp();
                }
                else {
                    console.log(555)
                  ToastAndroid.show('确定要退出吗', 100);
                  this.state.now = new Date().getTime();
                  return true;
                }
              }
            // if (new Date().getTime() - this.state.now < 2000) {
            //     BackHandler.exitApp();
            // } else {
            //     console.log(555)
            //     ToastAndroid.show('确定要退出吗', 100);
            //     this.state.now = new Date().getTime();
            //     return true;
            // }
        });
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View
                    style={{ alignItems: 'center' }}>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                        }}>
                        <Icon name="user" color="red" />
                        <TextInput placeholder="用户名"
                            onChangeText={this.userhandle}
                        />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                        }}>
                        <Icon name="user" color="red" />
                        <TextInput
                            onChangeText={this.pwdhandle}
                            placeholder="密码"
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            width: '80%',
                            height: 40,
                            backgroundColor: '#ccc',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.login}>
                        <Text>登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: '80%',
                            height: 40,
                            backgroundColor: '#ccc',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => Actions.zhuce()}>
                        <Text>还没有账号？去注册</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.isloading
                        ? <View style={{ paddingTop: 50, paddingLeft: 208 }}><Text>正在登录...</Text></View>
                        : null
                }
            </View>
        );
    }
}
