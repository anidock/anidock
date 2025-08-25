import { supabase } from "./supabaseClient";

export async function followUser(followerId, followingId) {
  const { data, error } = await supabase.from("follows").insert([{ follower: followerId, following: followingId }]);
  if (error) throw error;
  return data;
}

export async function unfollowUser(followerId, followingId) {
  const { data, error } = await supabase.from("follows").delete().match({ follower: followerId, following: followingId });
  if (error) throw error;
  return data;
}

export async function fetchFollowing(userId) {
  const { data, error } = await supabase.from("follows").select("following").eq("follower", userId);
  if (error) throw error;
  return data;
}

