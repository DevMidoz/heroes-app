import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../../_modules/Material.Module';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Output() ratingChanged = new EventEmitter<number>();
  ratingArr!: any[];

  onStarClick(star: number) {
    this.ratingChanged.emit(star);
  }

  ngOnInit(): void {
    this.ratingArr = new Array(5);
  }
}
