import { supabase } from "./supabaseClient";

export async function postReview(userId, animeId, rating, text) {
  const { data, error } = await supabase
    .from("reviews")
    .insert([{ user_id: userId, anime_id: animeId, rating, review_text: text }]);
  if (error) throw error;
  return data;
}

export async function fetchReviews(animeId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("id,user_id,rating,review_text,created_at")
    .eq("anime_id", animeId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchRatings(animeIds = []) {
  const q = supabase.from("anime_ratings").select("*");
  if (animeIds.length) q.in("anime_id", animeIds);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

