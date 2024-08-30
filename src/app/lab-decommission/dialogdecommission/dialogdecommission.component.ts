
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatTabLabel } from '@angular/material/tabs';

@Component({
  selector: 'app-dialogdecommission',
  standalone: true,
  imports: [MatButtonModule, MatTabLabel, MatFormField],
  templateUrl: './dialogdecommission.component.html',
  styleUrl: './dialogdecommission.component.scss'
})
export class DialogdecommissionComponent {

  readonly dialogRef = inject(MatDialogRef<DialogdecommissionComponent>);




  closeDialog(){

  this.dialogRef.close();}





}
