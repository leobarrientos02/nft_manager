import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Nft } from './nft';
import { NftService } from './nft.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public nfts!: Nft[];

  public nft: any;

  public editNft!: Nft;
  public deleteNft?: Nft;

  constructor(private nftService: NftService) { }

  // used to call the function
  ngOnInit() {
    this.getNft();
  }

  public getNft():void {
    this.nftService.getNfts().subscribe(
      (response: Nft[]) => {
        this.nfts = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public onAddNft(addForm: NgForm): void {
    document.getElementById('add-nft')?.click();
    this.nftService.addNft(addForm.value).subscribe(
      (response: Nft) => {
        console.log(response);
        this.getNft();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onEditNft(nft: Nft): void {
    this.nftService.updateNft(nft).subscribe(
      (response: Nft) => {
        console.log(response);
        this.getNft();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onDeleteNft(nftId: any) {
    this.nftService.deleteNft(nftId).subscribe(
      (response: void) => {
        console.log(response);
        this.getNft();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public searchNft(key: string): void {
    const results: Nft[] = [];
    for(const nft of this.nfts){
      if(nft.name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(nft);
      }
    }
    this.nfts = results;
    if(results.length === 0 || !key){
      this.getNft();
    }
  }

  public onOpenModal(nft: Nft, mode: string): void {
    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addNftModal');
    }
    if(mode === 'edit'){
      button.setAttribute('data-target', '#editNftModal');
      this.editNft = nft;
    }
    if(mode === 'delete'){
      this.deleteNft = nft;
      button.setAttribute('data-target', '#deleteNftModal');
    }
    container?.appendChild(button);
    button.click();
  }
}

