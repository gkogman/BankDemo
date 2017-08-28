import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Document } from '../../models';
declare var $: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  private start = false;
  @Input()
  public Documents: Document[] = [];

  constructor(http: Http) {
  }


  isActive(url: string) {
    return url === this.Documents[0].Url;
  }

  startCarousel() {
    $('.carousel').carousel();
  }

  select(index: number) {
    $('.carousel').carousel(index);
  }

  ngOnInit() {
  }

}
