import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "4b1515da5dmsh10d4459b56e1690p1e6a5ejsn42c432e23603",
		"X-RapidAPI-Host": "shazam-core.p.rapidapi.com"
	}
};

fetch("https://shazam-core.p.rapidapi.com/v1/charts/world", options)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.log(err));

export const shazamCoreApi = createApi({
	reducerPath: "shazamCoreApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://shazam-core.p.rapidapi.com/v1",
		prepareHeaders: (headers) => {
			headers.set("X-RapidAPI-Key", "4b1515da5dmsh10d4459b56e1690p1e6a5ejsn42c432e23603");

			return headers;
		}
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({ query: () => "/charts/world" }),
		getSongsByGenre: builder.query({
			query: (genre) => `/charts/genre-world?genre_code=${genre}`
		}),
		getSongDetails: builder.query({
			query: ({ songid }) => `/tracks/details/?track_id=${songid} `
		}),
		getSongRelated: builder.query({
			query: ({ songid }) => `/tracks/related/?track_id=${songid} `
		}),
		getArtistDetails: builder.query({
			query: (artistId) => `/tracks/related/?track_id=${artistId} `
		}),
		getSongByCountry: builder.query({
			query: (countryCode) => `/charts/country?country_code=${countryCode} `
		}),
		getSongbySearch: builder.query({
			query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`
		})
	})
});

export const { useGetTopChartsQuery, useGetSongsByGenreQuery, useGetSongDetailsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery, useGetSongByCountryQuery, useGetSongbySearchQuery } = shazamCoreApi;
