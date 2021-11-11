import { Component, ElementRef, Inject, ViewChild } from '@angular/core';

// Import neccessary classes from @syncfusion module
import { DataManager } from '@syncfusion/ej2-data';
import { ColumnModel, RowPosition } from '@syncfusion/ej2-treegrid';
import { ContextMenuItemModel, TextAlign } from '@syncfusion/ej2-grids';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
// Import sample test data from sample typescript file in your local host.
import { sampleData } from './syncgrid.sample';
// Import classes
import { CustomColumnModel } from './customcolumnmodel';
// Import constants from constants.ts
import {
  ADDCHILD_ROW_MENU_ID,
  ADDNEXT_ROW_MENU_ID,
  CHOOSE_COLUMN_MENU_ID,
  COPY_ROW_MENU_ID,
  CUT_ROW_MENU_ID,
  DEL_COLUMN_MENU_ID,
  DEL_ROW_MENU_ID,
  EDIT_COLUMN_MENU_ID,
  EDIT_ROW_MENU_ID,
  FILTER_COLUMN_MENU_ID,
  FREEZE_COLUMN_MENU_ID,
  MULTISELECT_ROW_MENU_ID,
  MULTISORT_COLUMN_MENU_ID,
  NEW_COLUMN_MENU_ID,
  PASTECHILD_ROW_MENU_ID,
  PASTENEXT_ROW_MENU_ID,
  ADDCHILD_ROW_MENU_LABEL,
  ADDNEXT_ROW_MENU_LABEL,
  CHOOSE_COLUMN_MENU_LABEL,
  COPY_ROW_MENU_LABEL,
  CUT_ROW_MENU_LABEL,
  DEL_COLUMN_MENU_LABEL,
  DEL_ROW_MENU_LABEL,
  EDIT_COLUMN_MENU_LABEL,
  EDIT_ROW_MENU_LABEL,
  FILTER_COLUMN_MENU_LABEL,
  FREEZE_COLUMN_MENU_LABEL,
  MULTISELECT_ROW_MENU_LABEL,
  MULTISORT_COLUMN_MENU_LABEL,
  NEW_COLUMN_MENU_LABEL,
  PASTECHILD_ROW_MENU_LABEL,
  PASTENEXT_ROW_MENU_LABEL,
  TREEGRID_HEADER_CELL_QUERY,
  TREEGRID_ROW_DRAG_DROP_CELL_QUERY,
} from './constants';
import { getIndexOfChildElement } from './utils';

import * as GridEvents from '@syncfusion/ej2-grids/src/grid/base/constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
/**
 * App Component is our main component.
 *
 */
export class AppComponent {
  // TreeGrid Component
  @ViewChild('treegrid')
  public treeGrid!: TreeGridComponent;
  // Dialog Component
  @ViewChild('dialog') dialog!: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('treegrid', { read: ElementRef, static: true })
  container!: ElementRef;
  // Dialog Form
  dialogForm!: FormGroup;
  // Dialog Form Builder
  build!: FormBuilder;
  // The Dialog shows within the target element.
  public targetElement!: HTMLElement;
  // Data source for testing our app
  public dataSource: DataManager = new DataManager({ json: sampleData });
  // Columns of our treegrid
  public columns: ColumnModel[] = [
    {
      field: 'TaskID',
      headerText: 'Task ID',
      textAlign: 'Right',
      isPrimaryKey: true,
      type: 'Number',
      editType: 'numericedit',
      minWidth: 100,
      customAttributes: {
        style: {
          'background-color': '#ffffff',
          color: '#000000',
          'font-size': '15px',
          'white-space': 'pre-line',
          'overflow-wrap': 'normal',
        },
      },
    },
    {
      field: 'TaskName',
      headerText: 'Task Name',
      textAlign: 'Left',
      type: 'Text',
      minWidth: 100,
      customAttributes: {
        style: {
          'background-color': '#ffffff',
          color: '#000000',
          'font-size': '15px',
          'white-space': 'pre-line',
          'overflow-wrap': 'normal',
        },
      },
    },
    {
      field: 'StartDate',
      headerText: 'Start Date',
      textAlign: 'Right',
      type: 'date',
      format: 'yMd',
      editType: 'datepickeredit',
      minWidth: 100,
      customAttributes: {
        style: {
          'background-color': '#ffffff',
          color: '#000000',
          'font-size': '15px',
          'white-space': 'pre-line',
          'overflow-wrap': 'normal',
        },
      },
    },
    {
      field: 'EndDate',
      headerText: 'End Date',
      textAlign: 'Right',
      type: 'date',
      format: 'yMd',
      editType: 'datepickeredit',
      minWidth: 100,
      customAttributes: {
        style: {
          'background-color': '#ffffff',
          color: '#000000',
          'font-size': '15px',
          'white-space': 'pre-line',
          'overflow-wrap': 'normal',
        },
      },
    },
    {
      field: 'Duration',
      headerText: 'Duration',
      textAlign: 'Right',

      type: 'Number',
      editType: 'numericedit',
      minWidth: 100,
      customAttributes: {
        style: {
          'background-color': '#ffffff',
          color: '#000000',
          'font-size': '15px',
          'white-space': 'pre-line',
          'overflow-wrap': 'normal',
        },
      },
    },
    {
      field: 'Progress',
      headerText: 'Progress',
      textAlign: 'Right',

      type: 'DropDownList',
      editType: 'dropdownedit',
      minWidth: 100,
      customAttributes: {
        style: {
          'background-color': '#ffffff',
          color: '#000000',
          'font-size': '15px',
          'white-space': 'pre-line',
          'overflow-wrap': 'normal',
        },
      },
    },
    {
      field: 'Priority',
      headerText: 'Priority',
      textAlign: 'Right',

      type: 'DropDownList',
      editType: 'dropdownedit',
      minWidth: 100,
      customAttributes: {
        style: {
          'background-color': '#ffffff',
          color: '#000000',
          'font-size': '15px',
          'white-space': 'pre-line',
          'overflow-wrap': 'normal',
        },
      },
    },
  ];
  // Custom column models of our treegrid
  public customColumns: CustomColumnModel[] = [
    {
      field: 'TaskID',
      name: 'Task ID',
      dataType: 'Number',
      defaultValue: '',
      minimumWidth: 100,
      fontSize: 15,
      fontColor: '#000000',
      backgroundColor: '#ffffff',
      alignment: 'Right',
      textWrap: 'WordWrap',
    },
    {
      field: 'TaskName',
      name: 'Task Name',
      dataType: 'Text',
      defaultValue: '',
      minimumWidth: 100,
      fontSize: 15,
      fontColor: '#000000',
      backgroundColor: '#ffffff',
      alignment: 'Left',
      textWrap: 'WordWrap',
    },
    {
      field: 'StartDate',
      name: 'Start Date',
      dataType: 'Date',
      defaultValue: '',
      minimumWidth: 100,
      fontSize: 15,
      fontColor: '#000000',
      backgroundColor: '#ffffff',
      alignment: 'Right',
      textWrap: 'WordWrap',
    },
    {
      field: 'EndDate',
      name: 'End Date',
      dataType: 'Date',
      defaultValue: '',
      minimumWidth: 100,
      fontSize: 15,
      fontColor: '#000000',
      backgroundColor: '#ffffff',
      alignment: 'Right',
      textWrap: 'WordWrap',
    },
    {
      field: 'Duration',
      name: 'Duration',
      dataType: 'Number',
      defaultValue: '',
      minimumWidth: 100,
      fontSize: 15,
      fontColor: '#000000',
      backgroundColor: '#ffffff',
      alignment: 'Right',
      textWrap: 'WordWrap',
    },
    {
      field: 'Progress',
      name: 'Progress',
      dataType: 'DropDownList',
      defaultValue: '',
      minimumWidth: 100,
      fontSize: 15,
      fontColor: '#000000',
      backgroundColor: '#ffffff',
      alignment: 'Right',
      textWrap: 'WordWrap',
    },
    {
      field: 'Priority',
      name: 'Priority',
      dataType: 'DropDownList',
      defaultValue: '',
      minimumWidth: 100,
      fontSize: 15,
      fontColor: '#000000',
      backgroundColor: '#ffffff',
      alignment: 'Right',
      textWrap: 'WordWrap',
    },
  ];
  // Context Menu Items of treegrid
  public contextMenuItems: ContextMenuItemModel[] = [
    // Menu Items for column header eg. class name is 'e-headercell'
    {
      text: NEW_COLUMN_MENU_LABEL,
      id: NEW_COLUMN_MENU_ID,
      target: TREEGRID_HEADER_CELL_QUERY,
    },
    {
      text: DEL_COLUMN_MENU_LABEL,
      id: DEL_COLUMN_MENU_ID,
      target: TREEGRID_HEADER_CELL_QUERY,
    },
    {
      text: EDIT_COLUMN_MENU_LABEL,
      id: EDIT_COLUMN_MENU_ID,
      target: TREEGRID_HEADER_CELL_QUERY,
    },
    {
      text: CHOOSE_COLUMN_MENU_LABEL,
      id: CHOOSE_COLUMN_MENU_ID,
      target: TREEGRID_HEADER_CELL_QUERY,
    },
    {
      text: FREEZE_COLUMN_MENU_LABEL,
      id: FREEZE_COLUMN_MENU_ID,
      target: TREEGRID_HEADER_CELL_QUERY,
    },
    {
      text: FILTER_COLUMN_MENU_LABEL,
      id: FILTER_COLUMN_MENU_ID,
      target: TREEGRID_HEADER_CELL_QUERY,
    },
    {
      text: MULTISORT_COLUMN_MENU_LABEL,
      id: MULTISORT_COLUMN_MENU_ID,
      target: TREEGRID_HEADER_CELL_QUERY,
    },
    // Menu Items for content eg. class name is 'e-content'
    {
      text: ADDNEXT_ROW_MENU_LABEL,
      id: ADDNEXT_ROW_MENU_ID,
      target: TREEGRID_ROW_DRAG_DROP_CELL_QUERY,
    },
    // Id is 'Child' because we use default function of TreeGrid.
    {
      text: ADDCHILD_ROW_MENU_LABEL,
      id: ADDCHILD_ROW_MENU_ID,
      target: TREEGRID_ROW_DRAG_DROP_CELL_QUERY,
    },
    {
      text: DEL_ROW_MENU_LABEL,
      id: DEL_ROW_MENU_ID,
      target: TREEGRID_ROW_DRAG_DROP_CELL_QUERY,
    },
    {
      text: EDIT_ROW_MENU_LABEL,
      id: EDIT_ROW_MENU_ID,
      target: TREEGRID_ROW_DRAG_DROP_CELL_QUERY,
    },
    {
      text: MULTISELECT_ROW_MENU_LABEL,
      id: MULTISELECT_ROW_MENU_ID,
      target: TREEGRID_ROW_DRAG_DROP_CELL_QUERY,
    },
    {
      text: COPY_ROW_MENU_LABEL,
      id: COPY_ROW_MENU_ID,
      target: TREEGRID_ROW_DRAG_DROP_CELL_QUERY,
    },
    {
      text: CUT_ROW_MENU_LABEL,
      id: CUT_ROW_MENU_ID,
      target: TREEGRID_ROW_DRAG_DROP_CELL_QUERY,
    },
    {
      text: PASTENEXT_ROW_MENU_LABEL,
      id: PASTENEXT_ROW_MENU_ID,
      target: TREEGRID_ROW_DRAG_DROP_CELL_QUERY,
    },
    {
      text: PASTECHILD_ROW_MENU_LABEL,
      id: PASTECHILD_ROW_MENU_ID,
      target: TREEGRID_ROW_DRAG_DROP_CELL_QUERY,
    },
  ];
  // Variable which checks if column is frozen
  public isColumnFrozen: boolean = false;
  // Variable which checks if column is filtered
  public isColumnFiltered: boolean = false;
  // Variable which checks if column is filtered
  public isColumnMultiSorted: boolean = false;
  // Variable which checks if row is multiselected
  public isRowMultiSelected: boolean = false;
  // Variable saves current column index which is right clicked by user
  public columnIndex: number = 0;
  // Variable saves current menu ID
  public menuID!: string;
  // Column Data Types
  public columnDataTypes: string[] = [
    'Text',
    'Number',
    'Date',
    'Boolean',
    'DropDownList',
  ];
  // Data Type To Type Map
  public mapDataTypeToType: any = {
    Text: 'text',
    Number: 'number',
    Date: 'date',
    Boolean: 'boolean',
    DropDownList: 'dropdown',
  };
  // Data Type To Format Map
  public mapDataTypeToFormat: any = {
    Text: undefined,
    Number: undefined,
    Date: 'yMd',
    Boolean: undefined,
    DropDownList: undefined,
  };
  // Data Type To EditType Map
  public mapDataTypeToEditType: any = {
    Text: undefined,
    Number: 'numericedit',
    Date: 'dateedit',
    Boolean: 'booleanedit',
    DropDownList: 'dropdownedit',
  };
  // Edit Settings
  public editSettings: any = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog',
  };
  // Column Alignments
  public columnAlignments: string[] = ['Left', 'Right', 'Center', 'Justify'];
  // Column Text Wraps
  public columnTextWraps: string[] = ['WordWrap', 'NoWrap'];
  // Constructor
  constructor(@Inject(FormBuilder) private builder: FormBuilder) {
    this.build = builder;
    this.createForm();
  }
  // Create Dialog form
  createForm() {
    this.dialogForm = this.build.group({
      columnField: [''],
      columnName: ['', Validators.required],
      columnDataType: ['', Validators.required],
      columnDefaultValue: [''],
      columnMinimumWidth: ['', Validators.required],
      columnFontSize: ['', Validators.required],
      columnFontColor: ['', Validators.required],
      columnBackgroundColor: ['', Validators.required],
      columnAlignment: ['', Validators.required],
      columnTextWrap: ['', Validators.required],
    });
  }
  // Get next ID
  public taskID: number = 995;
  public getTaskID() {
    return this.taskID;
  }
  public increaseTaskID() {
    this.taskID++;
  }
  // Get columnField
  get columnField() {
    return this.dialogForm.get('columnField');
  }
  // Get columnName
  get columnName() {
    return this.dialogForm.get('columnName');
  }
  // Get columnDataType
  get columnDataType() {
    return this.dialogForm.get('columnDataType');
  }
  // Get columnDataType
  get columnDefaultValue() {
    return this.dialogForm.get('columnDefaultValue');
  }
  // Get columnDataType
  get columnMinimumWidth() {
    return this.dialogForm.get('columnMinimumWidth');
  }
  // Get columnDataType
  get columnFontSize() {
    return this.dialogForm.get('columnFontSize');
  }
  // Get columnDataType
  get columnFontColor() {
    return this.dialogForm.get('columnFontColor');
  }
  // Get columnDataType
  get columnBackgroundColor() {
    return this.dialogForm.get('columnBackgroundColor');
  }
  // Get columnDataType
  get columnAlignment() {
    return this.dialogForm.get('columnAlignment');
  }
  // Get columnDataType
  get columnTextWrap() {
    return this.dialogForm.get('columnTextWrap');
  }
  // Event called when form initialized.
  ngOnInit() {
    this.initilaizeTarget();
  }
  // On submit dialog form.
  onSubmitForm() {
    let customColumn: CustomColumnModel = {
      field: this.columnField?.value as string,
      name: this.columnName?.value as string,
      dataType: this.columnDataType?.value as string,
      defaultValue: this.columnDefaultValue?.value as any,
      minimumWidth: this.columnMinimumWidth?.value as number,
      fontSize: this.columnFontSize?.value as number,
      fontColor: this.columnFontColor?.value as string,
      backgroundColor: this.columnBackgroundColor?.value as string,
      alignment: this.columnAlignment?.value as string,
      textWrap: this.columnTextWrap?.value as string,
    };
    if (this.menuID === NEW_COLUMN_MENU_ID) {
      customColumn.field = customColumn.name;
      this.customColumns = [...this.customColumns, customColumn];
      this.columns = [
        ...this.columns,
        this.getColumnFromCustomColumn(customColumn),
      ];
      let json = (this.treeGrid.dataSource as DataManager).dataSource.json;
      this.dataSource = new DataManager({
        json: json?.map((value) => {
          return { ...value, [customColumn.field]: customColumn.defaultValue };
        }),
      });
    } else if (this.menuID === EDIT_COLUMN_MENU_ID) {
      this.customColumns = [
        ...this.customColumns.slice(0, this.columnIndex),
        customColumn,
        ...this.customColumns.slice(
          this.columnIndex + 1,
          this.customColumns.length
        ),
      ];
      this.columns = [
        ...this.columns.slice(0, this.columnIndex),
        this.getColumnFromCustomColumn(customColumn),
        ...this.columns.slice(this.columnIndex + 1, this.columns.length),
      ];
    }
    this.onCloseDialog();
  }
  // On cancel dialog form.
  onCancelForm() {
    this.onCloseDialog();
  }
  // Initialize the Dialog component target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  };
  // Sample level code to handle the menu click action
  public onOpenDialog = (model: CustomColumnModel): void => {
    // Call the show method to open the Dialog
    this.dialogForm.reset({
      columnField: model.field,
      columnName: model.name,
      columnDataType: model.dataType,
      columnDefaultValue: model.defaultValue,
      columnMinimumWidth: model.minimumWidth,
      columnFontSize: model.fontSize,
      columnFontColor: model.fontColor,
      columnBackgroundColor: model.backgroundColor,
      columnAlignment: model.alignment,
      columnTextWrap: model.textWrap,
    });
    this.dialog.show();
  };
  // Sample level code to handle the button click action
  public onCloseDialog = (): void => {
    // Call the hide method to close th Dialog
    this.dialog.hide();
  };
  // Event called before Context Menu opens
  contextMenuOpen(args: BeforeOpenCloseEventArgs): void {
    const menu = args.element;
    const item = (args.event.target as Element).closest(
      TREEGRID_HEADER_CELL_QUERY
    );

    const CHECK_BOX_OFF =
      '<input type="checkbox" class="e-control float-right" style="width:15px;height:15px;margin-top:11px;">';
    const CHECK_BOX_ON =
      '<input type="checkbox" class="e-control float-right" checked style="width:15px;height:15px;margin-top:11px;">';
    this.columnIndex = getIndexOfChildElement(item);
    menu.childNodes.forEach((node, index) => {
      let element = node as Element;
      // Render Menu Items
      switch (element.getAttribute('id')) {
        case FREEZE_COLUMN_MENU_ID:
          element.innerHTML =
            FREEZE_COLUMN_MENU_LABEL +
            (this.isColumnFrozen ? CHECK_BOX_ON : CHECK_BOX_OFF);
          break;
        case FILTER_COLUMN_MENU_ID:
          element.innerHTML =
            FILTER_COLUMN_MENU_LABEL +
            (this.isColumnFiltered ? CHECK_BOX_ON : CHECK_BOX_OFF);
          break;
        case MULTISORT_COLUMN_MENU_ID:
          element.innerHTML =
            MULTISORT_COLUMN_MENU_LABEL +
            (this.isColumnMultiSorted ? CHECK_BOX_ON : CHECK_BOX_OFF);
          break;
        case MULTISELECT_ROW_MENU_ID:
          element.innerHTML =
            MULTISELECT_ROW_MENU_LABEL +
            (this.isRowMultiSelected ? CHECK_BOX_ON : CHECK_BOX_OFF);
          break;
        default:
          break;
      }
    });

    if (this.columnIndex != -1) return;
    const rowIndexes = this.treeGrid.getSelectedRowIndexes();
    const selected: number =
      getIndexOfChildElement(
        this.treeGrid.getRowInfo(args.event.target as EventTarget).row
      ) + 1;
    let found = false;
    rowIndexes.forEach((ind: any) => {
      if (ind == selected) found = true;
    });

    if (found) this.treeGrid.selectRows(rowIndexes);
    else this.treeGrid.selectRow(selected);
  }
  // Event called before user clicked Menu Item
  contextMenuClick(args: MenuEventArgs): void {
    this.menuID = args.item.id as string;
    switch (args.item.id) {
      case NEW_COLUMN_MENU_ID:
        this.onNewColumn();
        break;
      case DEL_COLUMN_MENU_ID:
        this.onDelColumn();
        break;
      case EDIT_COLUMN_MENU_ID:
        this.onEditColumn();
        break;
      case CHOOSE_COLUMN_MENU_ID:
        this.onChooseColumn();
        break;
      case FREEZE_COLUMN_MENU_ID:
        this.onFreezeColumn();
        break;
      case FILTER_COLUMN_MENU_ID:
        this.onFilterColumn();
        break;
      case MULTISORT_COLUMN_MENU_ID:
        this.onMultiSortColumn();
        break;
      case ADDNEXT_ROW_MENU_ID:
        this.onAddNextRow();
        break;
      case ADDCHILD_ROW_MENU_ID:
        this.onAddChildRow();
        break;
      case DEL_ROW_MENU_ID:
        this.onDelRow();
        break;
      case EDIT_ROW_MENU_ID:
        this.onEditRow();
        break;
      case MULTISELECT_ROW_MENU_ID:
        this.onMultiSelectRow();
        break;
      case COPY_ROW_MENU_ID:
        this.onCopyRow();
        break;
      case CUT_ROW_MENU_ID:
        this.onCutRow();
        break;
      case PASTENEXT_ROW_MENU_ID:
        this.onPasteNextRow();
        break;
      case PASTECHILD_ROW_MENU_ID:
        this.onPasteChildRow();
        break;
    }
  }
  // Called when componenet is newly created
  created(args: Object) {
    this.treeGrid.grid.allowMultiSorting = false;
  }
  // Get ColumnModel from CustomColumnModel
  getColumnFromCustomColumn(customColumn: CustomColumnModel): ColumnModel {
    return {
      field: customColumn.field,
      headerText: customColumn.name,
      textAlign: customColumn.alignment as TextAlign,
      type: this.mapDataTypeToType[customColumn.dataType],
      format: this.mapDataTypeToFormat[customColumn.dataType],
      editType: this.mapDataTypeToEditType[customColumn.dataType],
      minWidth: customColumn.minimumWidth,
      defaultValue: customColumn.defaultValue,
      customAttributes: {
        style: {
          'background-color': customColumn.backgroundColor,
          color: customColumn.fontColor,
          'font-size': customColumn.fontSize + 'px',
          'white-space': 'pre-line',
          'overflow-wrap':
            customColumn.textWrap === 'WordWrap' ? 'normal' : 'break-word',
        },
      },
    };
  }
  // Calls when Add Next Row clicked
  onAddNextRow() {
    $('#_gridcontrolTaskID').val(this.getTaskID());
    $('#_gridcontrolTaskID').attr('disabled', 'true');
    $('.e-footer-content .e-primary').click(() => {
      this.increaseTaskID();
    });
  }
  // Calls when Add Child Row clicked
  onAddChildRow() {
    $('#_gridcontrolTaskID').val(this.getTaskID());
    $('#_gridcontrolTaskID').attr('disabled', 'true');
    $('.e-footer-content .e-primary').click(() => {
      this.increaseTaskID();
    });
  }
  // Calls when Del Row clicked
  onDelRow() {
    this.treeGrid
      .getSelectedRowIndexes()
      .reverse()
      .forEach((rowIndex) => {
        this.treeGrid.deleteRow(this.treeGrid.getRows()[rowIndex]);
      });
  }
  // Calls when Edit Row clicked
  onEditRow() {
    this.treeGrid.grid.startEdit();
  }
  // Calls when MultiSelect Row clicked
  onMultiSelectRow() {
    this.isRowMultiSelected = !this.isRowMultiSelected;
  }
  // Calls when Copy Row clicked
  onCopyRow() {
    this.cutMode = false;
    this.removeColorfromRow(this.treeRowIndexes);
    this.treeRowIndexes = [];
    this.copiedRow = this.treeGrid.getSelectedRowIndexes();
    this.copiedRow.forEach((rowInd: any) => {
      let row = this.treeGrid.getRowByIndex(rowInd);

      var uid: string = row.getAttribute('data-uid') as string;
      var rowObj = this.treeGrid.grid.getRowObjectFromUID(uid);

      let OneRowIndexes = this.getIdNodeTreeFromRow(rowObj.data);
      OneRowIndexes.forEach((el: any) => this.treeRowIndexes.push(el));

      row.classList.remove('bgcolor');
      for (let j = 0, l = row.children.length; j < l; j++) {
        row.children[j].setAttribute(
          'style',
          row.children[j].getAttribute('prev-style') as string
        );
      }
    });
    this.setColorRow(this.treeRowIndexes);
    this.treeGrid.selectRows([]);
  }
  // Calls when Cut Row clicked
  onCutRow() {
    this.onCopyRow();
    this.cutMode = true;
  }
  // Calls when PasteNext Row clicked
  onPasteNextRow() {
    let rowInd2Paste = this.treeGrid.getSelectedRowIndexes()[0];
    this.removeColorfromRow(this.copiedRow);
    this.onCopyAndPasteTo(rowInd2Paste, this.cutMode, true);
    this.copiedRow = null;
    this.treeRowIndexes = [];
  }
  // Calls when PasteChild Row clicked
  onPasteChildRow() {
    let rowInd2Paste = this.treeGrid.getSelectedRowIndexes()[0];
    this.removeColorfromRow(this.copiedRow);
    this.onCopyAndPasteTo(rowInd2Paste, this.cutMode, false);
    this.copiedRow = null;
    this.treeRowIndexes = [];
  }
  // Calls when New clicked by user on column header menu.
  onNewColumn() {
    this.onOpenDialog({
      field: '',
      name: '',
      dataType: 'Text',
      defaultValue: '',
      minimumWidth: 100,
      fontSize: 15,
      fontColor: '#000000',
      backgroundColor: '#ffffff',
      alignment: 'Left',
      textWrap: 'WordWrap',
    });
  }
  // Calls when Del clicked by user on column header menu.
  onDelColumn() {
    this.customColumns = [
      ...this.customColumns.slice(0, this.columnIndex),
      ...this.customColumns.slice(
        this.columnIndex + 1,
        this.customColumns.length
      ),
    ];
    this.columns = [
      ...this.columns.slice(0, this.columnIndex),
      ...this.columns.slice(this.columnIndex + 1, this.columns.length),
    ];
  }
  // Calls when Edit clicked by user on column header menu.
  onEditColumn() {
    this.onOpenDialog(this.customColumns[this.columnIndex]);
  }
  // Calls when Choose clicked by user on column header menu.
  onChooseColumn() {
    this.treeGrid.grid.columnChooserModule.openColumnChooser(0, 0);
  }
  // Calls when Freeze clicked by user on column header menu.
  onFreezeColumn() {
    this.isColumnFrozen = !this.isColumnFrozen;
    if (this.isColumnFrozen) this.treeGrid.frozenColumns = this.columnIndex + 1;
    else this.treeGrid.frozenColumns = 0;
  }
  // Calls when Filter clicked by user on column header menu.
  onFilterColumn() {
    this.isColumnFiltered = !this.isColumnFiltered;
  }
  // Calls when MultiSort clicked by user on column header menu.
  onMultiSortColumn() {
    this.isColumnMultiSorted = !this.isColumnMultiSorted;
    this.treeGrid.grid.allowMultiSorting = this.isColumnMultiSorted;
  }

  // update JSON data

  onCopyAndPasteTo(targetIndex: number, isCut: boolean, isSibling: boolean) {
    let sourceIndexes = this.copiedRow,
      mapIndexToIscopied: any = {},
      i,
      items = (this.treeGrid.dataSource as DataManager).dataSource
        .json as any[],
      l = items?.length as number,
      sl,
      si,
      sourceIndex,
      soruceItem,
      item,
      parentIndex,
      insertionIndex = 0,
      insertedItems: any[] = [],
      newItems: any[] = [],
      cuttedItems: any[] = [],
      mapPrevIDToNextID: any = {},
      prevID;
    for (si = 0, sl = sourceIndexes.length; si < sl; si++) {
      sourceIndex = sourceIndexes[si];
      soruceItem = items[sourceIndex];
      mapIndexToIscopied[soruceItem['TaskID']] = 1;
      for (i = sourceIndex + 1; i < l; i++) {
        item = items[i];
        parentIndex = item['ParentItem'];
        if (mapIndexToIscopied[parentIndex] === 1)
          mapIndexToIscopied[item['TaskID']] = 1;
      }
    }
    for (i = 0; i < l; i++) {
      if (mapIndexToIscopied[items[i]['TaskID']] === 1) {
        item = Object.assign({}, items[i]);
        prevID = item['TaskID'];
        item['TaskID'] = this.getTaskID();
        this.increaseTaskID();
        mapPrevIDToNextID[prevID] = item['TaskID'];
        if (!mapIndexToIscopied[items[i]['ParentItem']]) {
          item['ParentItem'] = isSibling
            ? items[targetIndex]['ParentItem']
            : items[targetIndex]['TaskID'];
        } else {
          item['ParentItem'] = mapPrevIDToNextID[items[i]['ParentItem']];
        }
        insertedItems.push(item);
      }
    }
    if (!isSibling) {
      items[targetIndex]['isParent'] = true;
    }
    if (!isSibling) insertionIndex = targetIndex + 1;
    else {
      for (
        insertionIndex = targetIndex + 1;
        insertionIndex < l &&
        items[targetIndex]['ParentItem'] !==
          items[insertionIndex]['ParentItem'];
        insertionIndex++
      );
    }
    newItems = [
      ...items.slice(0, insertionIndex),
      ...insertedItems,
      ...items.slice(insertionIndex + 1),
    ];
    if (isCut) {
      newItems.forEach((value) => {
        if (!mapIndexToIscopied[value['TaskID']]) {
          cuttedItems.push(value);
        }
      });
      newItems = cuttedItems;
    }
    this.dataSource = new DataManager({
      json: newItems,
    });
    console.log(newItems);
  }

  // Whale Shark

  // Variables

  public cutMode: boolean = false;
  public copyContent: string = '';
  public copiedRow: any;
  public treeRowIndexes: any;

  // Functions

  public getIdNodeTreeFromRow(el: any) {
    var treeIdNode: any = [];
    treeIdNode.push(el.index);
    if (el.childRecords === undefined) return treeIdNode;
    el.childRecords.forEach((childEl: any) => {
      let treeEl = this.getIdNodeTreeFromRow(childEl);
      treeEl.forEach((el: any) => treeIdNode.push(el));
    });
    return treeIdNode;
  }
  public rowSelected(e: any) {
    // Deselect previous all rows.
    let prevSelectedRows = this.treeGrid
      .getContent()
      .querySelectorAll('.bgcolor');
    for (let i = 0; i < prevSelectedRows.length; i++) {
      prevSelectedRows[i].classList.remove('bgcolor');
      for (let j = 0, l = prevSelectedRows[i].children.length; j < l; j++) {
        prevSelectedRows[i].children[j].setAttribute(
          'style',
          prevSelectedRows[i].children[j].getAttribute('prev-style') as string
        );
      }
    }

    let rows = this.treeGrid.getSelectedRows();
    rows.forEach((row: Element) => {
      row.classList.add('bgcolor');
      for (let j = 0, l = row.children.length; j < l; j++) {
        let style = row.children[j].getAttribute('style') as string;
        if (style === null) {
          style = '';
        }
        row.children[j].setAttribute('prev-style', style);
        const backgroundColorCSSName = 'background-color';
        const letterIndex = style.search(backgroundColorCSSName);
        const prevStyle = style.slice(0, letterIndex);
        const nextStyleWithBackgroundColor = style.slice(letterIndex);
        const semiColonIndex = nextStyleWithBackgroundColor.search(';');
        const nextStyle = nextStyleWithBackgroundColor.slice(
          semiColonIndex + 1
        );

        row.children[j].setAttribute(
          'style',
          prevStyle + 'background-color: steelblue;' + nextStyle
        );
      }
    });
  }

  public rowDeselected(e: any) {
    // Deselect previous all rows.
    let prevSelectedRows = this.treeGrid
      .getContent()
      .querySelectorAll('.bgcolor');
    for (let i = 0; i < prevSelectedRows.length; i++) {
      prevSelectedRows[i].classList.remove('bgcolor');
      for (let j = 0, l = prevSelectedRows[i].children.length; j < l; j++) {
        prevSelectedRows[i].children[j].setAttribute(
          'style',
          prevSelectedRows[i].children[j].getAttribute('prev-style') as string
        );
      }
    }

    let rows = this.treeGrid.getSelectedRows();
    rows.forEach((row: Element) => {
      row.classList.add('bgcolor');
      for (let j = 0, l = row.children.length; j < l; j++) {
        let style = row.children[j].getAttribute('style') as string;
        if (style === null) {
          style = '';
        }
        row.children[j].setAttribute('prev-style', style);
        const backgroundColorCSSName = 'background-color';
        const letterIndex = style.search(backgroundColorCSSName);
        const prevStyle = style.slice(0, letterIndex);
        const nextStyleWithBackgroundColor = style.slice(letterIndex);
        const semiColonIndex = nextStyleWithBackgroundColor.search(';');
        const nextStyle = nextStyleWithBackgroundColor.slice(
          semiColonIndex + 1
        );

        row.children[j].setAttribute(
          'style',
          prevStyle + 'background-color: steelblue;' + nextStyle
        );
      }
    });
    //}
  }

  public setColorRow(rowIndexes: any) {
    if (rowIndexes == null) return;
    rowIndexes.forEach((rowInd: any) => {
      var row = this.treeGrid.getRows()[rowInd];
      row.classList.remove('bgcolor');
      row.classList.add('pink-row');
      for (let j = 0, l = row.children.length; j < l; j++) {
        let style = row.children[j].getAttribute('style') as string;
        if (style === null) {
          style = '';
        }
        row.children[j].setAttribute('prev-style', style);
        const backgroundColorCSSName = 'background-color';
        const letterIndex = style.search(backgroundColorCSSName);
        const prevStyle = style.slice(0, letterIndex);
        const nextStyleWithBackgroundColor = style.slice(letterIndex);
        const semiColonIndex = nextStyleWithBackgroundColor.search(';');
        const nextStyle = nextStyleWithBackgroundColor.slice(
          semiColonIndex + 1
        );

        row.children[j].setAttribute(
          'style',
          prevStyle + 'background-color: pink;' + nextStyle
        );
      }
    });
  }
  public removeColorfromRow(rowIndexes: any) {
    if (rowIndexes == null) return;
    rowIndexes.forEach((rowInd: any) => {
      var row = this.treeGrid.getRows()[rowInd];
      row.classList.remove('pink-row');

      for (let j = 0, l = row.children.length; j < l; j++) {
        row.children[j].setAttribute(
          'style',
          row.children[j].getAttribute('prev-style') as string
        );
      }
    });
  }
}
