import { getInstance } from "./authWrapper";

export const authGuard = (to: any, from: any, next: any) => {
    const authService = getInstance() as any;

    const fn = () => {
        if (authService.isAuthenticated) {
            return next();
        }

        authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
        return next(false);
    };

    if (!authService.loading) {
        return fn();
    }

    authService.$watch("loading", (loading: boolean) => {
        if (loading === false) {
            return fn();
        }

        return next(false);
    });
};
