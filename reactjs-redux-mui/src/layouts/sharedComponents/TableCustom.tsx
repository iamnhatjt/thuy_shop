import React from "react";
import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { IPagination } from "../../common/response.interface";
import { TableContainerProps } from "@mui/material/TableContainer/TableContainer";

interface TableCustomProps {
  columns: ColumnTableType[];
  rows: any[];
  pagination: IPagination;
  tableContainerProps?: TableContainerProps;
}

export interface ColumnTableType {
  columnName: string;
  fieldName: string;
  sx?: SxProps;
  customDisplay?: (data: any) => JSX.Element;
  sxData?: SxProps;
}

const TableCustom: React.FC<TableCustomProps> = ({
  columns,
  rows,
  pagination,
  tableContainerProps,
}) => {
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((item: ColumnTableType, key: number) => (
                <TableCell key={key} align="center" sx={item.sx}>
                  <Typography variant="subtitle1">{item.columnName}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((data, key: number) => (
              <TableRow key={key}>
                {columns.map((column: ColumnTableType, index: number) => (
                  <TableCell key={index} sx={column.sxData} align="center">
                    {column?.customDisplay ? (
                      <column.customDisplay data={data} />
                    ) : (
                      <Typography variant="subtitle2">
                        {data[column.fieldName]}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          margin: "12px 20px",
        }}
      >
        <Pagination
          count={Math.ceil(pagination.totalCount / pagination.pageSize)}
          variant="outlined"
        />
      </Box>
    </>
  );
};

export default React.memo(TableCustom);
