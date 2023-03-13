import { FormControl } from '@angular/forms';

export interface FormUser {
  email: FormControl<string | null>;
  contrasena: FormControl<string | null>;
}
