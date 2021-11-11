import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import @syncfusion modules
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import {
  TextBoxAllModule,
  NumericTextBoxAllModule,
  ColorPickerAllModule,
} from '@syncfusion/ej2-angular-inputs';
import {
  DropDownListAllModule,
  MultiSelectAllModule,
} from '@syncfusion/ej2-angular-dropdowns';
import {
  ButtonAllModule,
  CheckBoxAllModule,
  SwitchModule,
} from '@syncfusion/ej2-angular-buttons';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import {
  ContextMenuModule,
  ToolbarModule,
} from '@syncfusion/ej2-angular-navigations';
// Import services from @syncfusion/ejs-angular-treegrid module
import {
  PageService,
  FilterService,
  EditService,
  ToolbarService,
  SortService,
  ResizeService,
  ReorderService,
  ExcelExportService,
  PdfExportService,
  ContextMenuService,
  FreezeService,
  RowDDService,
  SelectionService,
  ColumnChooserService,
} from '@syncfusion/ej2-angular-treegrid';
// Import main module - AppComponent
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TreeGridAllModule,
    TextBoxAllModule,
    NumericTextBoxAllModule,
    ColorPickerAllModule,
    DropDownListAllModule,
    MultiSelectAllModule,
    ButtonAllModule,
    CheckBoxAllModule,
    SwitchModule,
    DialogModule,
    DatePickerModule,
    ContextMenuModule,
    ToolbarModule,
  ],
  providers: [
    PageService,
    FilterService,
    EditService,
    ToolbarService,
    SortService,
    ResizeService,
    ReorderService,
    ExcelExportService,
    PdfExportService,
    ContextMenuService,
    FreezeService,
    RowDDService,
    SelectionService,
    ColumnChooserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
