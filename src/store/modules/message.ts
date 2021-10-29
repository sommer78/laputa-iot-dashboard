
import * as SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stomp-websocket';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useUserStore } from './user';
import { useMessage } from "/@/hooks/web/useMessage";
import type { NoticeTabItem } from '/#/store';
export const SET_SOCKET = 'set_socket'
export const SET_DROPPED = 'set_dropped'
export const SET_ACTIVE_GROUP_USER = 'set_active_group_user'
export const SET_ACTIVE_ROOM = 'set_active_room'
export const SET_USER_GATHER = 'set_user_gather'
export const SET_FRIEND_GATHER = 'set_friend_gather'
export const SET_GROUP_GATHER = 'set_group_gather'
export const ADD_GROUP_MESSAGE = 'add_group_message'
export const SET_GROUP_MESSAGES = 'set_group_messages'
export const ADD_FRIEND_MESSAGE = 'add_friend_message'
export const SET_FRIEND_MESSAGES = 'set_friend_messages'
export const DEL_GROUP = 'del_group'
export const DEL_GROUP_MEMBER = 'del_group_member'
export const DEL_FRIEND = 'del_friend'
export const ADD_UNREAD_GATHER = 'set_unread_gather'
export const LOSE_UNREAD_GATHER = 'lose_unread_gather'
export const REVOKE_MESSAGE = 'revoke_message'
export const USER_ONLINE = 'user_online'
export const USER_OFFLINE = 'user_offline'
export const ADD_GROUP_MEMBER = 'add_group_member'
export const UPDATE_USER_INFO = 'update_user_info'


export const LAPUTA = {
  WEBSOCKET_URI_ENDPOINT:'/api/msg/ws',
  WEBSOCKET_URI_SEND_HEARTBEAT:'/app/heartbeat',
  WEBSOCKET_URI_SUBSCRIBE_HEARTBEAT:'/user/topic/heartbeat',
  WEBSOCKET_URI_SEND_HEARTBEAT_INTERVAL: 10000,
  WEBSOCKET_URI_GET_ALL_UNREAD_COUNT_INTERVAL: 2000,
  WEBSOCKET_HEADERS: {'Authorization': 'Bearer '},
  CHAT_WATCH_SEND_INTERVAL: 5000,
}
export interface MyListener {
  topic: string,
  callback: () => ([])
}
interface MessageState {
  url: string;
  checkInterval?: boolean;
  websocket?: object;
  stompClient?: object;
  listenerList?: [];
  headers: string;
  unread?: number;
  reconnectCount?: number;
  newMessagesCount?: number;
  noteciTabListData: NoticeTabItem[];
  noticeListData: NoticeTabItem;
  msgListData: NoticeTabItem;
  taskListData: NoticeTabItem;
}
import { tabListData } from './notice.data';

export const useMessageStore = defineStore({
  id: 'app-message',
  state: (): MessageState => ({
    url:'',
    checkInterval:true,//断线重连时 检测连接是否建立成功
    websocket: new Object,
    stompClient:new Object,
    listenerList:[],//监听器列表，断线重连时 用于重新注册监听
    headers: '', 
    reconnectCount : 0,
    newMessagesCount: 0,
    unread: 0,
    noteciTabListData: [],
    noticeListData: tabListData[0],
    msgListData: tabListData[1],
    taskListData: tabListData[2],
  }),
  getters: {
    getStompClient(): any {
      return this.stompClient;
    },
    getNewMessagesCount(): number{
      return this.newMessagesCount;
    },
    getUnread(): number{
      let count = 0;

      for (let i = 0; i < this.noteciTabListData.length; i++) {
        if(this.noteciTabListData[i] && this.noteciTabListData[i].list && this.noteciTabListData[i].list.length>0){
          count += this.noteciTabListData[i].list.length;
        }
       
      }
      return this.unread + count;
    },
    getNoteciTabListData(): NoticeTabItem[]{
          if(this.noticeListData && this.noticeListData.list && this.noticeListData.list.length>0){
            this.noteciTabListData.push(this.noticeListData);
          }
          if(this.msgListData && this.msgListData.list && this.msgListData.list.length>0){
            this.noteciTabListData.push(this.msgListData);
          }
          if(this.taskListData && this.taskListData.list && this.taskListData.list.length>0){
            this.noteciTabListData.push(this.taskListData);
          }
          return this.noteciTabListData;
    },
  },
  actions: {

    websocket_init(url) {
      this.reconnectCount = 0;
      if(this.stompClient==null||!this.stompClient.connected) {
        this.url = url
        if(this.websocket==null){
                 
          this.websocket_connect();
          return;
        }
        if(this.stompClient!=null&&this.websocket.readyState=== SockJS.OPEN){
          this.stompClient.disconnect(()=>{
          this.websocket_connect();
            // commit('websocket_connect')
          })
        }else if(this.stompClient!=null&&this.websocket.readyState=== SockJS.CONNECTING){
          console.log("连接正在建立")
          return;
        }else{
          this.websocket_connect();
          // commit('websocket_connect')
        }
        if(!this.checkInterval){
          const interval=setInterval(()=>{
            console.log("检测连接："+this.websocket.readyState)
            if(this.stompClient!=null&&this.stompClient.connected){
              clearInterval(this.checkInterval)
              this.checkInterval=null
              console.log('重连成功')
            }else if(this.stompClient!=null&&this.websocket.readyState!= SockJS.CONNECTING){
              //经常会遇到websocket的状态为open 但是stompClient的状态却是未连接状态，故此处需要把连接断掉 然后重连
              this.stompClient.disconnect(()=>{
                this.websocket_connect();
                // this.commit('websocket_connect')
              })
            }
          },2000)
          this.checkInterval=interval
        }
      }else{
        console.log("连接已建立成功，不再执行")
      }
    },
    async websocket_connect(){
      const userStore = useUserStore();
      const token = userStore.getToken;
      const TENANT_ID = userStore.getTenant?userStore.getTenant.id: 1;
      const headers = {
        "TENANT-ID": TENANT_ID,
        Authorization: "Bearer " + token,
      };
      this.headers = headers;
      const { notification } = useMessage();

      this.websocket = new SockJS(this.url);
      this.listenerList.push({topic: '/user/topic/heartbeat', callback:  (payload:any) => {
        // console.log('heartbeat',payload.body);
        const json:any =  JSON.parse(payload.body);
        // console.log('json',json);
        const str = JSON.stringify(json.data);
        // 订阅服务端提供的某个topic;
        notification.success({
            message: "心跳完成",
            description: str,
            duration: 3,
          });
      this.newMessagesCount++;
      }});
      this.listenerList.push({topic:'/user/public',callback:  (payload:any) => {
        console.log('public',payload);  
        notification.success({
          message: "公共通知",
          description: payload.body,
          duration: 3,
        });
      }});
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over( this.websocket);
      this.stompClient.debug = true; //关闭控制台打印
      this. stompClient.heartbeat.outgoing = 20000;
      this.stompClient.heartbeat.incoming = 0;//客户端不从服务端接收心跳包
      // 向服务器发起websocket连接
      this.stompClient.connect(
        headers,  //此处注意更换自己的用户名，最好以参数形式带入
        payload => {
          console.log('链接成功！',payload)
          this.listenerList.forEach(item=>{
            console.log(item)
            this.stompClient.subscribe(item.topic,item.callback)
          })
       
         
          this.stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: ` ${userStore.getUserInfo.username}`, type: 'JOIN'})
    )

          //unsubscribe()可以用来取消客户端对这个目的地destination的订阅
          // stompClient.subscribe("/user/queue/message", msg => {
          //   // this.getData(msg);
          //   console.log(msg)
          // });
        },
        err => {//第一次连接失败和连接后断开连接都会调用这个函数 此处调用重连
          console.error(err);
          notification.error({
              message: "通讯错误",
              description: ` ${userStore.getUserInfo.username}` + err,
              duration: 3,
          });
          setTimeout(() => {
            // commit('WEBSOCKET_INIT', state.url)
          }, 1000)
         
        }
      );
      // this.stompClient = stompClient;
        // 断开重连机制
      setInterval(() => {
          try {
            this.stompClient.send(LAPUTA.WEBSOCKET_URI_SEND_HEARTBEAT, {},JSON.stringify({'status':'0', username:` ${userStore.getUserInfo.username}`, time: Date.now() }))
          } catch (e) {
              console.log('WebSocket connection interrupt: ' + e)
              this.reconnectCount++;
              if(this.reconnectCount>10){
                  notification.error({
                    message: "重连错误过多错误",
                    description: ` ${userStore.getUserInfo.username}` + e,
                    duration: 3,
                });
              }else{
                this.websocket_connect();
              }
             
          }
      }, LAPUTA.WEBSOCKET_URI_SEND_HEARTBEAT_INTERVAL)
    },
    websocket_send(p) {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.send(p.topic,{},p.data);
      }
     
    },
    websocket_unsubsrcibe(p){
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.unsubscribe(p)
      }
     
      for(let i=0;i<this.listenerList.length;i++){
        if(this.listenerList[i].topic==p){
          this.listenerList.splice(i,1)
          console.log("解除订阅："+p+" size:"+this.listenerList.length)
          break;
        }
      }
    },
    websocket_subsrcibe(p){
      this.stompClient.subscribe(p.topic,p.callback)
      this.listenerListrouter.push(p);
      console.log("添加订阅："+p+" size:"+this.listenerList.length);
    },
    websocket_disconnect() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log("Disconnected");
      }
    }
  },
  
})

// Need to be used outside the setup
export function useMessageStoreWithOut() {
  return useMessageStore(store);
}
