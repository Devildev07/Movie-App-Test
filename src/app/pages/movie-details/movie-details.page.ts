import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  currentMovie: any;
  imgBaseUrl = environment.images;

  constructor(
    private route: ActivatedRoute,
    public moviesService: MovieService
  ) {}

  ngOnInit() {
    const id: string | any = this.route.snapshot.paramMap.get('id');
    this.moviesService.getMovieDetails(id).subscribe((res) => {
      console.log('res', res);
      this.currentMovie = res;
    });
  }


  openHomePage(){
    window.open(this.currentMovie.homepage)
  }
}
