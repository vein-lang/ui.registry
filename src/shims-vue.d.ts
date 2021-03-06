declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

import TimeAgo from "javascript-time-ago";
import { VueAppRenderFlags } from "./render";
import { ExtensionsAll } from "./extensions";
import { CombinedVueInstance } from "vue";
import { User } from "firebase/auth";
import { FirebaseAuth } from "./firebase";
import { State } from "./state";
import { Store } from "vuex";

const vsFunctions: {
  setColor(color: string, val: string): void;
  loading: (params?: LoadingParams) => CombinedVueInstance<Record<never, any> & Vue, object, object, object, Record<never, any>>;
  sortData: (evt: any, data: any, sortKey: string, type: string) => any[];
  getLength: (data: any, maxItems?: number) => any;
  checkAll: (selected: any, data: any) => any;
  getSearch: (data: any, search?: string) => any;
  notification: (params?: NotificationParams) => CombinedVueInstance<Record<never, any> & Vue, object, object, object, Record<never, any>>;
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $store: Store<State>;
    readonly $auth: FirebaseAuth & Vue;
    readonly $self_render: VueAppRenderFlags;
    readonly $timeAgo: TimeAgo;
    readonly $axios: ExtensionsAll;
    readonly $vs: vsFunctions;
    readonly $loader: { setLoaderCtor(loader: () => any), close(); open(); };
  }
}
