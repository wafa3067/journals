import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../api/slice/auth";
import loginReducer from "../api/slice/login";
import beginSlice from "../api/slice/beginSlice";
import uploadSlice from "../api/slice/uploadSlice";
import metaSlice from "../api/slice/metaData";
import tabSlice from "../api/providers/tab_bar";
import articleuploadSlice from "../api/slice/articleSlice";
import getArticleSlice from "../api/slice/getArticleSlice";
import getTokenSlice from "../api/slice/getTokenSlice";
import userSlice from "../api/slice/profileSlice";
import updateidentitySlice from "../api/slice/updateidentitySlice";
import contactSlice from "../api/slice/updateContactSlice";
import roleSlice from "../api/slice/roleSlice";
import updatePublicProfile from "../api/slice/publicSlice";
import updatePassword from "../api/slice/passwordSlice";
import profileStateSlice from "../api/slice/profileStateSlice";
import getCountArticles from "../api/slice/fetchArticaleCount";
import viewSlice from "../api/slice/viewSlice";
import authSlice from "../api/slice/tokenCheck";
import pendingReducer from "../admin/adminSlice/pending";
import underReviewSlice from "../admin/adminSlice/underreviewSlice";
import copyEditSlice from "../admin/adminSlice/copyeditorSlice";
import rejectArticleStatusSlice from "../admin/adminSlice/rejectArticalStatusSlice";
import RejectedDataSlice from "../admin/adminSlice/rejectedDataslice";
import productionSlice from "../admin/adminSlice/productionSlice";
import approvedSlice from "../admin/adminSlice/approved";
import userDataSlice from "../admin/adminSlice/userSlice";
import UpdateUserSlice from "../admin/adminSlice/updateUserSlice";
import findArticleByIdSlice from "../api/slice/getArticleByIdSlice";
import notificationSlice from "../admin/adminSlice/notificationSlice";
import adminAuthReducer from "../admin/adminSlice/adminAuthSlice";
import getNotificationSlice from "../api/slice/getNotificationSlice";
import archiveReducer from "../api/slice/archiveSlice";
import articleReducer from "../api/reducers/articleReducer"; // Handle search state here

let storeInstance: ReturnType<typeof configureStore> | null = null;
console.log("🧠 Store is being created..."); // 👈 ADD THIS

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      login: loginReducer,
      begin: beginSlice,
      upload: uploadSlice,
      meta: metaSlice,
      tab: tabSlice,
      article: articleuploadSlice,
      getArticle: getArticleSlice,
      token: getTokenSlice,
      user: userSlice,
      updateidentitySlice: updateidentitySlice,
      updateContacts: contactSlice,
      updateRole: roleSlice,
      updatepublic: updatePublicProfile,
      updatePassword: updatePassword,
      profileData: profileStateSlice,
      getCountArticles: getCountArticles,
      view: viewSlice,
      authToken: authSlice,
      pending: pendingReducer,
      underreview: underReviewSlice,
      copy: copyEditSlice,
      applyRejectedStatus: rejectArticleStatusSlice,
      rejectedArtical: RejectedDataSlice,
      production: productionSlice,
      approved: approvedSlice,
      userdata: userDataSlice,
      updateUser: UpdateUserSlice,
      getArticleById: findArticleByIdSlice,
      notificationSlice: notificationSlice,
      getnotification: getNotificationSlice,
      adminAuth: adminAuthReducer,
      archive: archiveReducer,
      searching: articleReducer, // Handle search state here
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export const store = storeInstance ?? (storeInstance = makeStore());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
