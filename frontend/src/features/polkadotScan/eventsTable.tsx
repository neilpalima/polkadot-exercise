import React from 'react';
import { Box, Chip } from '@material-ui/core';
import MUIDataTable, { TableFilterList } from "mui-datatables";

import { EventsTableData } from './scanSlice';

type EventsTableProps = {
  data: EventsTableData[]
};

const CustomChip = ({ label, onDelete } : any) => {
  return (
      <Chip
          variant="outlined"
          color="secondary"
          label={label}
          onDelete={onDelete}
      />
  );
};

const CustomFilterList = (props: any) => {
  return <TableFilterList {...props} ItemComponent={CustomChip} />;
};

function EventsTable(props: EventsTableProps) {
  const { data } = props;

  const columns = [
    {
      name: "block",
      label: "Block",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "extrinsic",
      label: "Extrinsic",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "event",
      label: "Event",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "data",
      label: "Event Data",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: any) => {
          if (typeof value === "object" && Array.isArray(value)) {
            const item = value[0];
            return typeof item === "object" ? JSON.stringify(item) : item;
          }

          return value;
        }
      }
    },
  ];

   const options = {
    elevation: 2,
    rowsPerPage: 25,
    rowsPerPageOptions: [10, 25, 50],
    selectableRows: 'none' as any,
    responsive: 'standard' as 'standard',
    textLabels: {
      body: {
        noMatch: 'Sorry, no matching records found',
        toolTip: 'Sort',
        columnHeaderTooltip: (column: any) => `Sort for ${column.label}`
      }
    },
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: true
   };

  return (
    <Box width="100%">
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
        components={{
          TableFilterList: CustomFilterList,
        }}
      />
    </Box>
  );
}

export default EventsTable;
