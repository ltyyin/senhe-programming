import { getToken, setToken, setRefreshToken, logoutRemoveToken } from '@/common/utils/auth.js'
import { setUserInfo, getUserInfo } from '@/common/utils/user.js'
import { phoneLogin, wxLogin } from '@/api/auth.js'
import { getInfo, wxGetInfo } from '@/api/user.js'
import refreshRequest from '@/common/utils/refreshRequest.js'

const getDefaultState = ()=> {
  return {
		authStatus: false,
    token: getToken(),
    name: "",
    avatar: "",
		phone: "",
		gender: "",
		birthday: "",
		grade: ""
  };
};

const getInfoCom = (commit)=> {
	return new Promise((resolve,reject)=> {
		// #ifndef MP
		resolve(getInfo())
		// #endif
		// #ifdef MP
		resolve(wxGetInfo())
		// #endif
	})
	.then(
		({data}) => {
			// #ifdef MP
			const userinfo = getUserInfo()
			Object.assign(data, userinfo)
			// #endif
			const { name, avatar, gender, birthday, phone, grade } = data
			// #ifndef MP
			setUserInfo({name, avatar})
			// #endif
			commit('SET_NAME', name)
			commit('SET_AVATAR', avatar)
			commit('SET_PHONE',phone)
			commit('SET_GENDER', gender)
			commit('SET_BIRTHDAY', birthday)
			commit('SET_GRADE', grade)
			commit('SET_AUTHSTATUS', true)
			return data
		}
	)
}

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
	SET_PHONE: (state, phone) => {
	  state.phone = phone;
	},
	SET_GENDER: (state, gender) => {
	  state.gender = gender;
	},
	SET_BIRTHDAY: (state, birthday) => {
	  state.birthday = birthday;
	},
	SET_AUTHSTATUS: (state, authStatus) => {
	  state.authStatus = authStatus;
	},
	SET_GRADE: (state, grade) => {
		state.grade = grade
	}
};

const actions = {
  async login({ commit }, payload) {
		// #ifndef MP
		const { data } = await phoneLogin(payload)
		// #endif
		// #ifdef MP
		const { data } = await wxLogin(payload)
		// #endif
		try{
			commit('SET_TOKEN', data.token)
			setToken(data.token, data.refreshToken)
		}catch(e){
			Promise.reject(new Error("登录失败"));
		}
  },

  // get user info
  async getInfo({ commit, state }) {
		try{
			return await getInfoCom(commit)
		}catch(err){
			// token过期之后使用refreshToken来刷新当前的token
			if(err.code === 50014) {
				try{
					const refreshRes = await refreshRequest()
					commit('SET_TOKEN', refreshRes.data.token)
					setRefreshToken(refreshRes.data.token)
					return await getInfoCom(commit)
				}catch(refreshErr) {
					const info = getUserInfo()
					commit('SET_NAME', info.name)
					commit('SET_AVATAR', info.avatar)
					return refreshErr
				}
			}
		}
  },

  // user logout
  async logout({ commit, state }) {
    commit("RESET_STATE");
		commit('SET_AUTHSTATUS', false)
		logoutRemoveToken()
		commit('SET_TOKEN', null)
  },

  // refresh token
  async refreshToken({ commit }) {
    commit("SET_TOKEN");
    commit("RESET_STATE");
  },

  // remove token
  async resetToken({ commit }) {
    commit("RESET_STATE");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
