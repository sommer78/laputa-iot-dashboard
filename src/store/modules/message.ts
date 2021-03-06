
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
    checkInterval:true,//??????????????? ??????????????????????????????
    websocket: new Object,
    stompClient:new Object,
    listenerList:[],//????????????????????????????????? ????????????????????????
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
          console.log("??????????????????")
          return;
        }else{
          this.websocket_connect();
          // commit('websocket_connect')
        }
        if(!this.checkInterval){
          const interval=setInterval(()=>{
            console.log("???????????????"+this.websocket.readyState)
            if(this.stompClient!=null&&this.stompClient.connected){
              clearInterval(this.checkInterval)
              this.checkInterval=null
              console.log('????????????')
            }else if(this.stompClient!=null&&this.websocket.readyState!= SockJS.CONNECTING){
              //???????????????websocket????????????open ??????stompClient??????????????????????????????????????????????????????????????? ????????????
              this.stompClient.disconnect(()=>{
                this.websocket_connect();
                // this.commit('websocket_connect')
              })
            }
          },2000)
          this.checkInterval=interval
        }
      }else{
        console.log("????????????????????????????????????")
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
        // ??????????????????????????????topic;
        notification.success({
            message: "????????????",
            description: str,
            duration: 3,
          });
      this.newMessagesCount++;
      }});
      this.listenerList.push({topic:'/user/public',callback:  (payload:any) => {
        console.log('public',payload);  
        notification.success({
          message: "????????????",
          description: payload.body,
          duration: 3,
        });
      }});
      // ??????STOMP???????????????????????????
      this.stompClient = Stomp.over( this.websocket);
      this.stompClient.debug = true; //?????????????????????
      this. stompClient.heartbeat.outgoing = 20000;
      this.stompClient.heartbeat.incoming = 0;//???????????????????????????????????????
      // ??????????????????websocket??????
      this.stompClient.connect(
        headers,  //??????????????????????????????????????????????????????????????????
        payload => {
          console.log('???????????????',payload)
          this.listenerList.forEach(item=>{
            console.log(item)
            this.stompClient.subscribe(item.topic,item.callback)
          })
       
         
          this.stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: ` ${userStore.getUserInfo.username}`, type: 'JOIN'})
    )

          //unsubscribe()?????????????????????????????????????????????destination?????????
          // stompClient.subscribe("/user/queue/message", msg => {
          //   // this.getData(msg);
          //   console.log(msg)
          // });
        },
        err => {//????????????????????????????????????????????????????????????????????? ??????????????????
          console.error(err);
          notification.error({
              message: "????????????",
              description: ` ${userStore.getUserInfo.username}` + err,
              duration: 3,
          });
          setTimeout(() => {
            // commit('WEBSOCKET_INIT', state.url)
          }, 1000)
         
        }
      );
      // this.stompClient = stompClient;
        // ??????????????????
      setInterval(() => {
          try {
            this.stompClient.send(LAPUTA.WEBSOCKET_URI_SEND_HEARTBEAT, {},JSON.stringify({'status':'0', username:` ${userStore.getUserInfo.username}`, time: Date.now() }))
          } catch (e) {
              console.log('WebSocket connection interrupt: ' + e)
              this.reconnectCount++;
              if(this.reconnectCount>10){
                  notification.error({
                    message: "????????????????????????",
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
          console.log("???????????????"+p+" size:"+this.listenerList.length)
          break;
        }
      }
    },
    websocket_subsrcibe(p){
      this.stompClient.subscribe(p.topic,p.callback)
      this.listenerListrouter.push(p);
      console.log("???????????????"+p+" size:"+this.listenerList.length);
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
