import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  @Output() search = new EventEmitter<any>();
  constructor() {}

  onSubmit(val: any) {
    this.search.emit(val);
  }

  ngOnInit(): void {}
}
