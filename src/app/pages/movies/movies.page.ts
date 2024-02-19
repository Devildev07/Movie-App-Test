import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any = [];
  currentPage = 1;
  imgBaseUrl = environment.images;

  constructor(
    private movieService: MovieService,
    private loaddingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadMovies();
  }
  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loaddingCtrl.create({
      message: 'Loading..',
      spinner: 'crescent',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) => {
      loading.dismiss();
      // this.movies = [...this.movies, ...res.results];
      this.movies.push(...res.results);
      console.log('top rated movies ', res);

      event?.target.complete();
      if (event) {
        event.target.disabled = res.total_page === this.currentPage;
      }
    });
  }

  loadMoreData(event: InfiniteScrollCustomEvent | any) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
