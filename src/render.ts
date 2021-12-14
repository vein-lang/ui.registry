import Vue, { PluginFunction, PluginObject, VueConstructor } from "vue";

let instance: Vue;

type RenderSetting = {
    navbarEnable: boolean
};

export type VueAppRenderFlags = {
} & RenderSetting & Vue;

export const useRenderSetting = ({
    ...options
}): VueAppRenderFlags => {
    if (instance) return instance as any;

    instance = new Vue({
        data(): RenderSetting {
            return {
                navbarEnable: true
            };
        }
    });

    return instance as any;
};

export const RenderPlugin: PluginObject<any> = {
    install(vue: VueConstructor, options: any) {
        (vue as any).prototype.$self_render = useRenderSetting(options);
        (window as any)["$self_render"] = (vue as any).prototype.$self_render;
    }
};
