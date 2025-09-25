import { FormControl } from '@angular/forms';

export interface FilterBarForm {
  query: FormControl<string>;
  categories: FormControl<string[]>;
}
