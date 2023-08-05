import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'
@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  constructor(private httpClient: HttpClient) { }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN)
    }
    return null
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }

  executeAuthenticationService(username: string, password: string) {
    return this.httpClient.post<any>(`${environment.api_url}/authenticate`, { username, password }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username)
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`)
        }
      )
    )
  }
}

export class AuthenticationBean {
  constructor(
    public message: string
  ) { }
}
