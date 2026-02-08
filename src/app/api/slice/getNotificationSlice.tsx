import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Notification {
  id: number;
  title: string;
  message: string;
  status: string;
  email: string;
  created: string;
  isRead: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

// ✅ Get all notifications by user
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem("email");
      const res = await axios.get(
        `http://localhost:8080/notification/get_notifications/${email}`
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch notifications"
      );
    }
  }
);

// ✅ Get unread notification count
export const fetchUnreadCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem("email");

      const res = await axios.get(
        `http://localhost:8080/notification/count_unread/${email}`
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch unread count"
      );
    }
  }
);

// ✅ Mark all notifications as read
export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    const email = localStorage.getItem("email");
    try {
      const res = await axios.put(
        `http://localhost:8080/notification/mark_all_read/${email}`
      );
      return res.data; // "X notifications marked as read"
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to mark as read");
    }
  }
);

const getNotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🟡 Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔵 Fetch unread count
      .addCase(fetchUnreadCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.loading = false;
        state.unreadCount = action.payload;
      })
      .addCase(fetchUnreadCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🟢 Mark all as read
      .addCase(markAllNotificationsRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.loading = false;
        state.notifications = state.notifications.map((n) => ({
          ...n,
          isRead: true,
        }));
        state.unreadCount = 0;
      })
      .addCase(markAllNotificationsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default getNotificationSlice.reducer;
