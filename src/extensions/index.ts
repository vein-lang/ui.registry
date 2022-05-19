import Vue, { PluginObject, VueConstructor } from "vue";

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import axios, { AxiosResponse } from "axios";
import { getAuth, Auth } from "firebase/auth";
TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US');

let instance: ExtensionsAll;
let auth: Auth | null = null;

export type ExtensionsFields = {
};

export type ExtensionsMethods = {
  $get(url: string): Promise<AxiosResponse<any, any>>;
  $getCancelable(url: string, ctl: AbortController): Promise<AxiosResponse<any, any>>;
  $post(url: string, data?: {}): Promise<AxiosResponse<any, any>>;
  $delete(url: string): Promise<AxiosResponse<any, any>>;
} & ExtensionsFields;

export type ExtensionsAll = {

} & ExtensionsMethods;

export const useExtension = ({
  ...options
}): ExtensionsAll => {
  if (instance) return instance as any;
  auth = getAuth();

  instance = {
    async $get(url: string): Promise<AxiosResponse<any, any>> {
      if (!auth?.currentUser)
        return await axios.get(url, { validateStatus: (x) => true, });
      return await axios.get(url, {
        headers: { "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}` },
        validateStatus: (x) => true,
      });
    },
    async $getCancelable(url: string, ctl: AbortController): Promise<AxiosResponse<any, any>> {
      return await axios.get(url, {
        signal: ctl.signal,
        validateStatus: (x) => true,
      });
    },
    async $post(url: string, data?: {}): Promise<AxiosResponse<any, any>> {
      if (!auth?.currentUser)
        return await axios.post(url, data, { validateStatus: (x) => true, });
      return await axios.post(url, data, {
        headers: { "Authorization": `Bearer ${await auth.currentUser.getIdToken()}` },
        validateStatus: (x) => true,
      });
    },
    async $delete(url: string): Promise<AxiosResponse<any, any>> {
      if (!auth?.currentUser)
        return await axios.delete(url, { validateStatus: (x) => true, });
      return await axios.delete(url, {
        headers: { "Authorization": `Bearer ${await auth.currentUser.getIdToken()}` },
        validateStatus: (x) => true,
      });
    }
  };

  return instance as any;
};


let _loader_ctor_;
let _loader_instance_;
let loader_obj = {
  setLoaderCtor(loader: () => any) { if (!_loader_ctor_) _loader_ctor_ = loader; },
  close() { if (_loader_instance_) _loader_instance_.close(); _loader_instance_ = undefined; },
  open() { if (!_loader_instance_) _loader_instance_ = _loader_ctor_(); }
};

export const ExtensionsPlugin: PluginObject<any> = {
  install(vue: VueConstructor, options: any) {
    ;
    (vue as any).prototype.$timeAgo = timeAgo;
    (vue as any).prototype.$axios = useExtension(options);
    (vue as any).prototype.$loader = loader_obj;
  }
};
