import { Component, OnInit } from '@angular/core';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private basicAuthenticationService: JwtAuthenticationService) { }

  ngOnInit(): void {
    this.basicAuthenticationService.logout()
  }

}
