import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route } from '../../../../models/route';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/model/app-state-model';
import { addRoute } from '../../../../store/actions/routes.actions';

@Component({
  selector: 'app-add-route-form',
  templateUrl: './add-route-form.component.html',
  styleUrls: ['./add-route-form.component.scss'],
})
export class AddRouteFormComponent implements OnInit {
  Difficulty: string[] = ['Easy', 'Medium', 'Hard', 'Hell'];

  public addRouteForm: FormGroup = new FormGroup({
    routeName: new FormControl(
      '',
      [Validators.required, Validators.minLength(3)],
      []
    ),
    difficultyLevel: new FormControl('', [Validators.required], []),
  });

  constructor(private store: Store<AppState>) {
    this.addRouteForm.valueChanges.subscribe();
  }

  ngOnInit(): void {}

  addRoute() {
    if (this.addRouteForm.valid) {
      const route: Route = {
        name: this.addRouteForm.get('routeName')?.value,
        difficultyLevelEnum: this.addRouteForm
          .get('difficultyLevel')
          ?.value.toString()
          .toUpperCase(),
      };

      // this.routeService.addRoute(route).subscribe();
      this.store.dispatch(addRoute({ route }));
    }
  }
}
