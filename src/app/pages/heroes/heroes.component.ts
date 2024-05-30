import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllHeroes } from '../../store/hero/hero.selectors';
import { loadHeroes } from '../../store/hero/hero.actions';
import { AppState } from '../../store/app.state';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'powers', 'rating'];
  allHeroes$ = this.store.select(selectAllHeroes);
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.store.dispatch(loadHeroes());

  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
