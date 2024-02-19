import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  [x: string]: any;
  page: number;
  results: any[];
  total_page: number;
  total_result: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page} `
    ).pipe(
      // map()
    )
  }

  getMovieDetails(id: string) {
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }
}
