import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../../_modules/Material.Module';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { addHero } from '../../../../store/hero/hero.actions';
import { HeroesService } from '../../services/heroes.service';
import { selectStatus } from '../../../../store/hero/hero.selectors';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RandomStringService } from '../../../../shared/services/random-string.service';

@Component({
  selector: 'app-add-hero',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-hero.component.html',
  styleUrl: './add-hero.component.scss',
})
export class AddHeroComponent {
  heroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private heroesService: HeroesService,
    public dialogRef: MatDialogRef<AddHeroComponent>,
    private _snackBar: MatSnackBar,
    private randomStringService: RandomStringService
  ) {}

  ngOnInit() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      powers: ['', Validators.required],
      rating: [
        null,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(5),
          Validators.pattern(/^\d+$/),
        ],
      ],
      description: ['', Validators.maxLength(255)], // Optional: Limit description length
    });
  }

  onSubmit() {
    if (this.heroForm.valid) {
      this.heroForm.value['id'] =
        this.randomStringService.generateRandomString();
      this.store.dispatch(addHero({ content: this.heroForm.value }));
      this.store.select(selectStatus).subscribe((status) => {
        this._snackBar.open('Hero Added Successfully', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar'],
          duration: 3500,
        });
        this.dialogRef.close();
      });
    }
  }
}
