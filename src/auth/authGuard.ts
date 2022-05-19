import { firebaseInstance } from "@/firebase";

export const authGuard = (to: any, from: any, next: any) => {
    const user = firebaseInstance.auth?.currentUser;
    if (!user)
      next({ name: "Home" })
    else
      next()
};
