import { useEffect, useState } from "react";
import { DataGrid as MUIDataGrid, gridClasses, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";

const DataGrid = ({ columns, selected, setSelected, data }) => {

    const [rows, setrows] = useState(data);

    useEffect(() => setrows(data), []);

    return (<div style={{ height: '100%', width: '100%' }}>
        <MUIDataGrid
            rows={rows}
            autoHeight
            pagination
            columns={columns}
            checkboxSelection
            density='compact'
            components={{
                Toolbar: GridToolbar,
            }}
            onSelectionModelChange={(a) => setSelected(a)}
            selectionModel={selected}
            disableVirtualization={false}
        />
    </div>);
}

function GridToolbar() {
    return (
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
            <GridToolbarExport csvOptions={{ allColumns: true }} printOptions={{ disableToolbarButton: true }} />
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    );
}

export default DataGrid;