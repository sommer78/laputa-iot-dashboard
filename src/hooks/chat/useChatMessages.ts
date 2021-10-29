
import { ref } from 'vue'
export const newMessages: any[] = [
  {
    id: 1,
    name: '名称',
    time: '2021-01-01',
    message: '怎么玩啊',
    me: true,
    uid: 868140350533795873,
  },
  {
    id: 2,
    name: '编码',
    time: '2021-01-01',
    width: 120,
    me: true,
    message: '怎么玩啊2',
  },
  {
    id: 3,
    name: '部门领导',
    time: '2021-01-01',
    width: 120,
    me: true,
    message: '怎么玩啊3',
  },
  {
    id: 4,
    name: '所属公司',
    time: '2021-01-01',
    width: 120,
    message: '怎么玩啊4',
  },
  {
    id: 5,
    name: '创建时间',
    time: '2021-01-01',
    message: '怎么玩啊5',
  }
];


export default function useChatMessages(roomId?: string) {
  const messages = ref<any[]>([])
  return newMessages;
  // if (!roomId) return messages

 

  // return messages
}
