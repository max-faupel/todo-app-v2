import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeBean, WelcomeDataService } from '../service/data/welcome-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  user: string = ''

  constructor(public authService: JwtAuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser() || ''
    console.log(this.user)
  }
}
