import { NgModule } from '@angular/core';
import {
    MatListModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule,
    MatToolbarModule, MatDialogModule, MatInputModule,MatProgressBarModule,
    MatCheckboxModule
} from '@angular/material';

@NgModule({
    exports: [
        MatListModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatToolbarModule,
        MatDialogModule,
        MatInputModule,
        MatProgressBarModule,
        MatCheckboxModule
    ]
})
export class ImportMaterialModule {

}