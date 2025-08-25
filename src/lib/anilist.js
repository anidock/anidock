const API = "https://graphql.anilist.co";

async function gql(query, variables={}){
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ query, variables })
  });
  if(!res.ok) throw new Error("AniList error");
  const json = await res.json();
  return json.data;
}

export async function fetchSection(type, page=1, perPage=20){
  const sortMap = {
    TRENDING: "TRENDING_DESC",
    POPULAR: "POPULARITY_DESC",
    TOP: "SCORE_DESC",
    UPCOMING: "START_DATE_DESC"
  };
  const query = `
    query($page:Int,$perPage:Int){
      Page(page:$page, perPage:$perPage){
        media(type: ANIME, sort: ${sortMap[type] || "TRENDING_DESC"}){
          id
          title{ romaji english native }
          averageScore
          seasonYear
          episodes
          format
          status
          coverImage{ large }
        }
      }
    }
  `;
  const data = await gql(query, { page, perPage });
  return data.Page.media;
}

export async function searchAnime(term, page=1, perPage=30){
  const query = `
    query($term:String,$page:Int,$perPage:Int){
      Page(page:$page, perPage:$perPage){
        media(type: ANIME, search:$term, sort: SEARCH_MATCH){
          id
          title{ romaji english }
          averageScore
          seasonYear
          episodes
          format
          status
          coverImage{ medium }
        }
      }
    }
  `;
  const data = await gql(query, { term, page, perPage });
  return data.Page.media;
}

export async function getAnime(id){
  const query = `
    query($id:Int){
      Media(id:$id, type: ANIME){
        id
        title{ romaji english native }
        description(asHtml:false)
        episodes
        averageScore
        seasonYear
        status
        genres
        format
        coverImage{ extraLarge }
        bannerImage
        studios{ nodes{ name } }
        trailer{ id site thumbnail }
      }
    }
  `;
  const data = await gql(query, { id: Number(id) });
  return data.Media;
}
