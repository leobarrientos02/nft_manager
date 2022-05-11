import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nft } from './nft';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NftService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getNfts(): Observable<Nft[]>{
    return this.http.get<any>(`${this.apiServiceUrl}/nft/all`);
  }

  public addNft(nft: Nft): Observable<Nft>{
    return this.http.post<Nft>(`${this.apiServiceUrl}/nft/add`, nft);
  }

  public updateNft(nft: Nft): Observable<Nft>{
    return this.http.put<Nft>(`${this.apiServiceUrl}/nft/update`, nft);
  }

  public deleteNft(nftId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/nft/delete/${nftId}`);
  }
}
