import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  username: '';
  title = 'githubprofileview';
  data: any;
  Response: any;
  showspinner = false;
  datlocal: any;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}
  search() {
    if (this.username) {
      this.showspinner = true;
      this.datlocal = localStorage.getItem(this.username);
      if (!this.datlocal) {
        this.showspinner = true;
        console.log(this.username);
        this.http.get('https://api.github.com/users/' + this.username + '?access_token=beba3c150021bfb49769385927dfa59fac2cdf04')
        .subscribe(Response => {
          this.data = Response;
          console.log(this.data);
          this.showspinner = false;
          localStorage.setItem(this.username, JSON.stringify(this.data));
        }, err => {
          this.showspinner = false;
          this.data = '';
          this.openSnackBar('bad credentials', 'ok');
        });
      } else {
        this.data = JSON.parse(this.datlocal);
        this.showspinner = false;
        console.log(this.data);
      }
    } else {
      this.data = '';
      this.openSnackBar('provide data', 'ok');
    }
  }

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 1000,
    verticalPosition: 'top',
    horizontalPosition: 'right'
  });
}
}
