import { NgModule } from '@angular/core';
import {
    MatListModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule,
    MatToolbarModule, MatDialogModule, MatInputModule,MatProgressBarModule
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
        MatProgressBarModule
    ]
})
export class ImportMaterialModule {

}