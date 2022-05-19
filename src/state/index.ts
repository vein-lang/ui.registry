import { User } from 'firebase/auth';
import Vue from 'vue'
import Vuex from 'vuex'


import {  MutationTree, ActionTree } from "vuex"



Vue.use(Vuex);


export class Keys {
  public static SET_USER: string = "SET_USER"
  public static SET_TOKEN: string = "SET_TOKEN"
  public static SET_ERROR: string = "SET_ERROR"
}

export class State {
  public user: User | null = null;
  public token: string | null = null;
  public isLoading: boolean = false;
  public errorMsg: string | null = null;
  public isAuthed: boolean = false;
}


const mutations = <MutationTree<State>>{
  [Keys.SET_USER]: (state: State, value: User | null) => {
    state.user = value;
    state.isAuthed = !!value;
    state.isLoading = false;
  },
  [Keys.SET_TOKEN]: (state: State, value: string | null) => {
    state.token = value;
    state.isLoading = false;
  },
  [Keys.SET_ERROR]: (state: State, value: string | null) => {
    state.errorMsg = value;
    state.isLoading = false;
  },
};
const actions = <ActionTree<State, any>>{};

export default new Vuex.Store({
  state: new State(),
  mutations: mutations,
  actions: actions,
  modules: {}
});
