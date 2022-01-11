import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { protectedResources } from '../auth/auth-config';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = "nothing"; //protectedResources.myApi.endpoint;

  constructor(private http: HttpClient) { }

  getWeather() { 
    return this.http.get<any[]>(this.url);
  }

  // getTodo(id: number) { 
  //   return this.http.get<any>(this.url + '/' +  id);
  // }
  
  // postTodo(todo: Todo) { 
  //   return this.http.post<Todo>(this.url, todo);
  // }

  // deleteTodo(id: number) {
  //   return this.http.delete(this.url + '/' + id);
  // }

  // editTodo(todo: Todo) { 
  //   return this.http.put<Todo>(this.url + '/' + todo.id, todo);
  // }
}
