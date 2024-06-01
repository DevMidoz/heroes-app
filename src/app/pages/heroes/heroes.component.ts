import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllHeroes } from '../../store/hero/hero.selectors';
import { editHero, loadHeroes } from '../../store/hero/hero.actions';
import { AppState } from '../../store/app.state';
import { CommonModule } from '@angular/common';
import { IHero } from './models/hero';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../_modules/Material.Module';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { StarRatingComponent } from '../../shared/components/star-rating/star-rating.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { selectUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-heroes',
  standalone: true,
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  imports: [CommonModule, MaterialModule, FormsModule, StarRatingComponent],
})
export class HeroesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'powers', 'rating'];
  datasource = new MatTableDataSource<IHero>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchText: string = '';
  sortByNameToggled: boolean = false;
  sortByPowersToggled: boolean = false;
  private destroy$ = new Subject<void>();
  public searchText$ = new Subject<string>();
  currentUser!: {
    id?: string | undefined;
    name?: string | undefined;
    powers?: string | undefined;
    rating?: number | undefined;
    description?: string | undefined;
  };

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.store
      .select(selectAllHeroes)
      .pipe(takeUntil(this.destroy$))
      .subscribe((heroes: IHero[]) => {
        this.datasource.data = heroes;
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        this.cdr.detectChanges();
      });

    this.searchText$
      .pipe(debounceTime(1500), takeUntil(this.destroy$))
      .subscribe((searchText) => this.applyFilter(searchText));

    this.store.select(selectUser).subscribe((res) => {
      this.currentUser = { ...res };
    });
  }

  ngOnInit() {
    this.store.dispatch(loadHeroes());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRatingChange(hero: IHero, newRating: number): void {
    this.store.dispatch(editHero({ content: { ...hero, rating: newRating } }));
  }

  sortByName(): void {
    this.sortByNameToggled = !this.sortByNameToggled;
    this.datasource.data = this.sortByNameToggled
      ? [...this.datasource.data].sort((a, b) => a.name.localeCompare(b.name))
      : [...this.datasource.data]; // Reset to original order or implement another sorting logic
  }

  sortByPowers(): void {
    this.sortByPowersToggled = !this.sortByPowersToggled;
    this.datasource.data = this.sortByPowersToggled
      ? [...this.datasource.data].sort((a, b) => {
          let powerA = a.powers.split(', ')[0];
          let powerB = b.powers.split(', ')[0];
          return powerA.localeCompare(powerB);
        })
      : [...this.datasource.data]; // Reset to original order or implement another sorting logic
  }

  applyFilter(searchText: string): void {
    this.datasource.filter = searchText.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  openAddHeroDialog(): void {
    const config = new MatDialogConfig();
    config.width = '40%';
    this.dialog.open(AddHeroComponent, config);
  }

  search(searchText: string): void {
    this.searchText = searchText;
    this.applyFilter(searchText);
  }
}
