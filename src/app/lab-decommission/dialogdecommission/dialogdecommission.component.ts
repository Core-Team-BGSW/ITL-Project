
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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialogdecommission',
  standalone: true,
  imports: [MatButtonModule, MatTabLabel, MatFormField,],
  templateUrl: './dialogdecommission.component.html',
  styleUrl: './dialogdecommission.component.scss'
})
export class DialogdecommissionComponent {

  readonly dialogRef = inject(MatDialogRef<DialogdecommissionComponent>);


  constructor(private toastr: ToastrService,){}

  closeDialog(){

  this.dialogRef.close();
  this.toastr.success('Waiting for approval', 'Process initiated')}





}
