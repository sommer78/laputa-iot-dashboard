import type { Authority, UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY, FRESH_TOKEN_KEY, AUTHORITIES_KEY, TENANTS_KEY, TENANT_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { UserInfoModel, LoginParams } from '/@/api/sys/model/userModel';
import { doLogout, getUserInfo, loginByUsername } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import {encryption,  deepClone } from '/@/utils/util'
import { fetchList } from '/@/api/sys/tenant';
import { TenantModel } from "/@/api/sys/model/TenantModel";
import { validatenull } from "/@/utils/validate";
interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  refresh_token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  expires_in: number;
  authorities: Authority[];
  tenants: TenantModel[];
  tenant: Nullable<TenantModel>;
  refreshLock?: boolean;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
     // 刷新token
    refresh_token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // 授权到期时间
    expires_in: 0,
    //用户权限
    authorities: [],
    //租户列表
    tenants: [],
    //当前租户
    tenant: null,
    refreshLock: false,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getTenant(): TenantModel | null {
     
      if(this.tenant || getAuthCache<TenantModel>(TENANT_KEY)){
        // console.log('getTenant',this.tenant);
        return this.tenant || getAuthCache<TenantModel>(TENANT_KEY);
      }else{
        
        if(this.tenants?.length > 0){
          // console.log('getTenants');
          return this.tenants[0];
        }
        return null;
      }
     
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getTenants(): TenantModel[] {
      return this.tenants.length > 0 ? this.tenants : getAuthCache<TenantModel[]>(TENANTS_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token;
      setAuthCache(TOKEN_KEY, token);
    },
    setFreshToken(refresh_token: string | undefined) {
      this.refresh_token = refresh_token;
      setAuthCache(FRESH_TOKEN_KEY, refresh_token);
    },
   
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setAuthorities(authorities: Authority[]) {
      this.authorities = authorities;
      setAuthCache(AUTHORITIES_KEY, authorities);
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    setTenants(tenants: TenantModel[]){
      this.tenants = tenants;
      setAuthCache(TENANTS_KEY, tenants);
    },
    setCurTenant(tenant: TenantModel){
      this.tenant = tenant;
      setAuthCache(TENANT_KEY, tenant);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
      this.authorities = [];
    },
    /**
     * @description: login
     */
     async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      }
    ): Promise<UserInfoModel | null> {
      try {
        const userWithEncode = encryption({
          data: params,
          key: 'laputaiotxlaputa',
          param: ['password']
        })
        // console.log(userWithEncode)
        const { goHome = true, mode, ...loginParams } = userWithEncode;
        const res = await loginByUsername(loginParams);
        // console.log(res.data)
        const { access_token } = res.data;
        const { user_info } = res.data;
        // save token
        this.setToken(access_token);
        this.setFreshToken(access_token);
        const userInfo  = deepClone(user_info);
        const { authorities } = user_info;
        this.setUserInfo(userInfo);
        this.setAuthorities(authorities);
        this.setRoleList([RoleEnum.SUPER, RoleEnum.TEST]);
      
        const sessionTimeout = this.sessionTimeout;
        sessionTimeout && this.setSessionTimeout(false);
        !sessionTimeout && goHome && (await router.replace(PageEnum.BASE_HOME));
        return user_info;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async refreshToken() {
      
        const token = this.token || getAuthCache<string>(TOKEN_KEY);
        if (validatenull(token)) {
          return
        }
        if (this.expires_in <= 1000 && !this.refreshLock) {
          this.refreshLock = true
          // refreshToken(state.refresh_token).then(response => {
          //   const data = response.data
          //   commit('SET_ACCESS_TOKEN', data.access_token)
          //   commit('SET_REFRESH_TOKEN', data.refresh_token)
          //   commit('SET_EXPIRES_IN', data.expires_in)
          //   commit('CLEAR_LOCK')
          //   resolve()
          // }).catch(error => {
          //   reject(error)
          // })
          this.refreshLock = false
        }
        // this.expires_in = 

      
    },
    async getTenantList() {
      const  tenants = ((await fetchList()) as any) as TenantModel[];
      this.setTenants(tenants);
      return tenants;
    },
    async getUserInfoAction() {
      const userInfo = await getUserInfo();
      const { roles } = userInfo;
      console.log(userInfo);
      const roleList = roles?.map((role) => role?.value) as RoleEnum[];
      this.setUserInfo(userInfo);
      this.setRoleList(roleList);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      try {
        await doLogout();
      } catch {
        console.log('注销Token失败');
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: t('sys.app.logoutTip'),
        content: t('sys.app.logoutMessage'),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
