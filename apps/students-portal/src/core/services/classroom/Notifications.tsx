import axios from "axios";

export async function getNotificationsCount() {
  try {
    const res = await axios.get(`/notifications/unread`);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getNotifications() {
  try {
    const res = await axios.get(`/notifications`);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const res = await axios.get(`/notifications/${notificationId}`);
    return res.data;
  } catch (error) {
    return error;
  }
}
