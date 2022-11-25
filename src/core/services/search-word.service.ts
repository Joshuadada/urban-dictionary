import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SearchWordService {
  constructor(private http: HttpClient){}
  headers = new HttpHeaders({
    'X-RapidAPI-Key': 'b15cf9a1f0mshf82c89ea9dc0e0ep158d71jsn9ccdd55b1509',
		'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
  });
  loadData(word: string){
    return this.http.get<any>(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${word}`, {
      headers: this.headers
    })
  }
}
