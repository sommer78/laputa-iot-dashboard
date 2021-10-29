<template>
  <div
    class="flex-shrink-0 w-1/3 max-w-sm sidebar"
    :style="{minHeight: isMobile ? height : 'auto'}"
  >
    <div class="sidebar__header">
      <div class="sidebar__header--left">
        <Avatar
          v-if="user"
          :src="user.avatar"
          :alt="user.username"
        />
        <h4>{{ user?.name }}</h4>
      </div>
      <div class="sidebar__header--right">
        <button @click="signOut">
           <Icon icon="ri:logout-circle-line"  />
        </button>
      </div>
    </div>

    <div class="sidebar__search">
      <form
        class="sidebar__search--container"
        @submit.prevent="searchUsersAndRooms"
      >
        
      <input
        id="search"
        v-model="query"
        placeholder="Search for users or rooms"
        type="text"
      >
      <Icon icon="bi:search" />
      </form>
    </div>

    <div class="sidebar__menu">
      <button
        :class="activeTab === 'Chats' && 'sidebar__menu--selected'"
        @click="activeTab = 'Chats'"
      >
        <div className="sidebar__menu--home">
          <Icon icon="ant-design:home-outlined" />
          <div className="sidebar__menu--line" />
        </div>
      </button>
      <button
        :class="activeTab === 'Rooms' && 'sidebar__menu--selected'"
        @click="activeTab = 'Rooms'"
      >
        <div className="sidebar__menu--rooms">
           <Icon icon="bi:chat-square-dots" />
   
          <div className="sidebar__menu--line" />
        </div>
      </button>
      <button
        :class="activeTab === 'Users' && 'sidebar__menu--selected'"
        @click="activeTab = 'Users'"
      >
        <div className="sidebar__menu--users">
           <Icon icon="fa-solid:users" />

          <div className="sidebar__menu--line" />
        </div>
      </button>
    </div>

    <SidebarList
      v-if="activeTab === 'Rooms'"
      :title="activeTab"
      :data="rooms"
    />
  
    <SidebarList
      v-if="activeTab === 'Users' && users"
      :title="activeTab"
      :data="users"
    />
    <SidebarList
      v-if="activeTab === 'Chats' && chats"
      :title="activeTab"
      :data="chats"
    />
    <SidebarList
      v-if="activeTab === 'Search'"
      :title="activeTab"
      :data="searchResults"
    />

    <div className="sidebar__chat--addRoom">
      <button @click="createRoom">
        <Icon icon="akar-icons:circle-plus" color="#ffffff6c" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
// import { auth } from '@/firebase'
import { Avatar } from 'ant-design-vue';
import { useWindowSize } from '/@/hooks/useWindowSize'
// import { user } from '@/hooks/useAuthUser'
// import useUsers from '@/hooks/useUsers'
// import useChats from '@/hooks/useChats'
import Icon from '/@/components/Icon'
import SidebarList from './SidebarList.vue'

// import { db, createTimestamp } from '@/firebase'
import { rooms } from '/@/hooks/chat/useRooms'
import { SysUser } from '/@/api/sys/model/userModel';
export default defineComponent({
  name: 'Sidebar',
  components: {
   Avatar,
    SidebarList,
    Icon,
  },
   props: {
 
    user: {
      type: Object as PropType<SysUser | null | undefined>,
      required: true,
    },
  },
  setup() {
    const { width, height, isMobile } = useWindowSize()
    const activeTab = ref('Rooms')

    // function signOut() {
    //   auth.signOut()
    //   location.reload()
    // }

    const query = ref('')
    const searchResults = ref()
    // async function searchUsersAndRooms() {
    //   // https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search
    //   // 2 ways to search text in firestore
    //   const userSnapshot = await db
    //     .collection('users')
    //     .orderBy('name')
    //     .startAt(query.value)
    //     .endAt(query.value + '~')
    //     .get()
    //   const roomSnapshot = await db
    //     .collection('rooms')
    //     .where('name', '>=', query.value)
    //     .where('name', '<=', query.value + '\uf8ff')
    //     .get()
    //   const userResults = userSnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }))
    //   const roomResults = roomSnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }))
    //   searchResults.value = [...userResults, ...roomResults]
    //   activeTab.value = 'Search'
    // }

    function createRoom() {
     
    }
    const users = ref([]);
    // const users = useUsers(user)
    // const chats = useChats(user)

    return {
  
      width,
      height,
      isMobile,
      // signOut,
      // searchUsersAndRooms,
      createRoom,
      activeTab,
      rooms,
      users,
      // chats,
      query,
      searchResults,
    }
  },
})
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
}

.sidebar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-right: 1px solid lightgrey;
  background-color: #ededed;
}

.sidebar__header--left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 68%;
}

.sidebar__header--left h4 {
  margin-left: 10px;
  font-size: 15px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
}

.sidebar__header--right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 120px;
}

.sidebar__header--right > .addRoom {
  margin-right: 2vw;
  font-size: 24px !important;
}



.sidebar__search {
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  padding: 10px;
  border-right: 1px solid lightgrey;
}

.sidebar__search--container {
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 35px;
  box-shadow: 0px 0px 8px 0px #00000016;
  /*border: 1px solid #00000016;*/
  border-radius: 20px;
  padding-right: 13px;
}

.sidebar__search--container > .Icon {
  color: grey;
  padding: 10px;
  box-sizing: content-box;
}

.sidebar__search--container > input {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  border: none;
  margin-left: 3px;
  width: 100%;
}

.sidebar__search--container > input:focus {
  outline: none;
}

.sidebar__menu {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ededed;
  border-right: 1px solid lightgrey;
}

.sidebar__menu > button,
.sidebar__menu > div {
  flex: 1;
  display: grid;
  place-items: center;
  padding-top: 15px;
  cursor: pointer;
}

.sidebar__menu div {
  width: 100%;
  display: grid;
  place-items: center;
}

.sidebar__menu div > .MuiSvgIcon-root {
  fill: #0000008a;
}

.sidebar__menu div > .sidebar__menu--line {
  opacity: 0;
  width: 100%;
  height: 3px;
  background: #0000008a;
  margin-top: 5px;
}

.sidebar__menu > .sidebar__menu--selected > div > .sidebar__menu--line {
  opacity: 1;
}

.sidebar__chat--container {
  flex: 1;
  background-color: white;
  overflow: scroll;
  position: relative;
}

.side {
  transform: scale(1) !important;
}

@media (max-width: 760px) {
  .sidebar {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: scale(1);
    transition: transform 250ms cubic-bezier(0.37, 0, 0.63, 1) !important;
  }

  .sidebar__header {
    border: none;
  }

  .sidebar__search {
    border: none;
  }

  .sidebar__menu {
    border: none;
  }
}

.sidebar__chat--addRoom {
  width: 50px;
  height: 50px;
  position: absolute;
  background-color: #06d755 !important;
  border-radius: 50%;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  color: white;
  box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.281);
  transform: translateZ(456px);
}

.sidebar__chat--addRoom button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.sidebar__chat--addRoom .anticon {
  transform: scale(1.3);
  color: white;
}

.scrollFetch {
  height: 90px !important;
}

.scrollFetch > div > .MuiCircularProgress-svg {
  transform: scale(1);
}

.sidebar__loader {
  background-color: transparent !important;
  height: 65% !important;
}

.sidebar__loader .MuiCircularProgress-svg {
  transform: scale(2) !important;
}

.no-result {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: noresult-fade-in 400ms forwards;
  padding: 1em;
}

.no-result > div > .MuiSvgIcon-root:nth-child(1) {
  transform: scale(3);
}

.cancel-root {
  background-color: #ffffff;
  border-radius: 50%;
  width: 25px;
  height: 25px;
}

.no-result > div {
  transform: scale(1.8);
}

.no-result > div > div {
  transform: translate(-60%, -90%);
}

.animate {
  opacity: 0;
}

@media (min-width: 760px) {
  .sidebar__chat:hover {
    background-color: #ebebeb;
    transition: background-color 200ms;
  }
}

@keyframes noresult-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.sidebar__chat--addRoom {
  width: 50px;
  height: 50px;
  position: absolute;
  background-color: #06d755 !important;
  border-radius: 50%;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  color: white;
  box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.281);
  transform: translateZ(456px);
}

.sidebar__chat--addRoom button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.sidebar__chat--addRoom .MuiSvgIcon-root {
  transform: scale(1.3);
  color: white;
}
</style>
