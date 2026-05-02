package com.movie.controller;

import com.movie.service.MovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchMovies(@RequestParam(name = "q", required = false) String query, 
                                          @RequestParam(required = false) String type) {
        try {
            return ResponseEntity.ok(movieService.searchMovies(query, type));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            System.err.println("Error fetching movies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Error fetching movies"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMovieById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(movieService.getMovieById(id));
        } catch (Exception e) {
            System.err.println("Error fetching movie details: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Error fetching movie details"));
        }
    }
    
    public record ErrorResponse(String message) {}
}
