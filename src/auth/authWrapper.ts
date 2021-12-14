import Vue, { PluginObject, VueConstructor } from "vue";
import createAuth0Client, { Auth0Client, GetTokenSilentlyVerboseResponse, IdToken } from "@auth0/auth0-spa-js";


const DEFAULT_REDIRECT_CALLBACK = (o: any) =>
    window.history.replaceState({}, document.title, window.location.pathname);

let instance: Vue;


export const getInstance = () => instance;
export type useAuth0Model =
    {
        loading: boolean,
        isAuthenticated: boolean,
        auth0Client: Auth0Client | null,
        popupOpen: boolean,
        error: Error | null,
        user: any
    };

export type VueAuth0 = {
    loginWithPopup(options: any, config: any): Promise<void>;
    handleRedirectCallback(): Promise<void>;
    loginWithRedirect(o: any): Promise<void>;
    getIdTokenClaims(o?: any): Promise<IdToken | undefined>;
    getTokenSilently(o?: any): Promise<GetTokenSilentlyVerboseResponse>;
    getTokenWithPopup(o?: any): Promise<string>;
    logout(o?: any): Promise<void> | void;
} & useAuth0Model & Vue;

export const useAuth0 = ({
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    redirectUri = window.location.origin,
    ...options
}): VueAuth0 => {
    if (instance) return instance as any;

    instance = new Vue({
        data(): useAuth0Model {
            return {
                loading: true,
                isAuthenticated: false,
                user: {},
                auth0Client: null,
                popupOpen: false,
                error: null
            };
        },
        methods: {
            async loginWithPopup(options: any, config: any): Promise<void> {
                this.popupOpen = true;
                try {
                    await this.auth0Client!.loginWithPopup(options, config);
                    this.user = await this.auth0Client!.getUser();
                    this.isAuthenticated = await this.auth0Client!.isAuthenticated();
                    this.error = null;
                } catch (e: any) {
                    console.error(e);
                    this.error = e;
                } finally {
                    this.popupOpen = false;
                }
            },
            async handleRedirectCallback(): Promise<void> {
                this.loading = true;
                try {
                    await this.auth0Client!.handleRedirectCallback();
                    this.user = await this.auth0Client!.getUser();
                    this.isAuthenticated = true;
                    this.error = null;
                }
                catch (e: any) {
                    this.error = e;
                }
                finally {
                    this.loading = false;
                }
            },
            loginWithRedirect(o: any): Promise<void> {
                return this.auth0Client!.loginWithRedirect(o);
            },
            getIdTokenClaims(o: any): Promise<IdToken | undefined>{
                return this.auth0Client!.getIdTokenClaims(o);
            },
            getTokenSilently(o: any): Promise<GetTokenSilentlyVerboseResponse> {
                return this.auth0Client!.getTokenSilently(o);
            },
            getTokenWithPopup(o: any): Promise<string> {
                return this.auth0Client!.getTokenWithPopup(o);
            },
            logout(o: any): Promise<void> | void {
                return this.auth0Client!.logout(o);
            }
        },
        async created() {
            this.auth0Client = await createAuth0Client({
                ...options,
                client_id: options.clientId,
                redirect_uri: redirectUri
            } as any);

            try {
                if (
                    window.location.search.includes("code=") &&
                    window.location.search.includes("state=")
                ) {
                    const { appState } = await this.auth0Client.handleRedirectCallback();
                    this.error = null;
                    onRedirectCallback(appState);
                }
            } catch (e: any) {
                this.error = e;
            } finally {
                this.isAuthenticated = await this.auth0Client.isAuthenticated();
                this.user = await this.auth0Client.getUser();
                this.loading = false;
            }
        }
    });

    return instance as any;
};

export const Auth0Plugin: PluginObject<any> = {
    install(vue: VueConstructor, options: any) {
        (vue as any).prototype.$auth = useAuth0(options);
        (window as any)["$auth"] = (vue as any).prototype.$auth;
    }
};
