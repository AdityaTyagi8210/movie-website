package com.movie.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieService {

    @Value("${omdb.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public Object searchMovies(String query, String type) {
        if (query == null || query.isEmpty()) {
            throw new IllegalArgumentException("Search query is required");
        }
        String url = "http://www.omdbapi.com/?apikey=" + apiKey + "&s=" + query;
        if (type != null && !type.isEmpty()) {
            url += "&type=" + type;
        }
        return restTemplate.getForObject(url, Object.class);
    }

    public Object getMovieById(String id) {
        String url = "http://www.omdbapi.com/?apikey=" + apiKey + "&i=" + id;
        return restTemplate.getForObject(url, Object.class);
    }
}
