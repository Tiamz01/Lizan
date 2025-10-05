import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Using Deezer API with proxy to bypass CORS restrictions
export const shazamCoreApi = createApi({
	reducerPath: "shazamCoreApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "/api",
		prepareHeaders: (headers) => {
			// Add headers to prevent caching issues
			headers.set('Cache-Control', 'no-cache');
			headers.set('Pragma', 'no-cache');
			headers.set('Expires', '0');
			return headers;
		}
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({ 
			query: () => "/chart/0/tracks?limit=20"
		}),
		getSongsByGenre: builder.query({
			query: (genre) => {
				// Map genre codes to Deezer genre IDs based on actual API response
				const genreMap = {
					POP: 132,           // Pop
					HIP_HOP_RAP: 116,   // Rap/Hip Hop
					DANCE: 113,         // Dance
					ELECTRONIC: 106,    // Electro
					SOUL_RNB: 165,      // R&B
					ALTERNATIVE: 85,    // Alternative
					ROCK: 152,          // Rock
					LATIN: 197,         // Latin Music
					FILM_TV: 173,       // Films/Games
					COUNTRY: 0,         // Using "All" genre as fallback
					WORLDWIDE: 0,       // Using "All" genre
					REGGAE_DANCE_HALL: 144, // Reggae
					HOUSE: 106,         // Same as ELECTRONIC
					K_POP: 0            // Using "All" genre as fallback
				};
				const genreId = genreMap[genre] || 0; // Default to "All" genre (0)
				
				// For now, we'll use the chart endpoint which provides variety
				// In a more advanced implementation, we could fetch artists by genre
				// and then their top tracks, but that would require multiple API calls
				return `/chart/0/tracks?limit=20`;
			}
		}),
		getSongDetails: builder.query({
			query: ({ songid }) => `/track/${songid}`
		}),
		getSongRelated: builder.query({
			query: ({ songid }) => `/track/${songid}/related?limit=10`
		}),
		getArtistDetails: builder.query({
			query: (artistId) => `/artist/${artistId}`
		}),
		getSongByCountry: builder.query({
			// Deezer doesn't have direct country charts, using top tracks
			query: () => "/chart/0/tracks?limit=20"
		}),
		getSongbySearch: builder.query({
			query: (searchTerm) => `/search?q=${searchTerm}&limit=20`
		})
	})
});

export const { 
	useGetTopChartsQuery, 
	useGetSongsByGenreQuery, 
	useGetSongDetailsQuery, 
	useGetSongRelatedQuery, 
	useGetArtistDetailsQuery, 
	useGetSongByCountryQuery, 
	useGetSongbySearchQuery 
} = shazamCoreApi;