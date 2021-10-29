interface Timestamp {
  nanoseconds: number
  seconds: number
}


export interface Message {
  id: string
  message: string
  name: string
  time: string
  timestamp: Timestamp
  uid: string
  imageUrl?: string
  imageName?: string
  audioUrl?: string
  audioName?: string
}


export interface MessageModel {
  id: number
  message: string
  name: string
  time: string
  timestamp: Timestamp
  uid: string
  imageUrl?: string
  imageName?: string
  audioUrl?: string
  audioName?: string
}

