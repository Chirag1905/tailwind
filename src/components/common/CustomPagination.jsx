import { Box, MenuItem, Select, Typography } from '@mui/material';
import { Pagination, PaginationItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const CustomPagination = ({ page, totalPages, handleChange, totalElements, rowsPerPage, handleChangeRowsPerPage }) => {

  const theme = createTheme({
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              '&:hover': {
               backgroundColor: 'var(--color-primary)',
              },
            },
          },
        },
      },
    },
  });

  return (
    <>
      <div className="flex md:flex-row flex-col bottom-0 left-0 right-0 text-xs items-center justify-between me-4 px-5 pt-2 pb-5 gap-3">
        <Box
          display="flex"
          alignItems="center"
          sx={{ fontSize: '0.875rem', fontFamily: 'Poppins, sans-serif', padding: '5px', width: 'fit-content' }}
        >
          <Typography sx={{ color: "#717171", fontSize: '13px', marginRight: '0px', fontFamily: 'Poppins, sans-serif' }}>
            Show
          </Typography>
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            sx={{ borderRadius: "6px", borderColor: "#B8B8B8", opacity: 1, margin: "0 5px", height: '30px', fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
          <Typography sx={{ color: "#717171", fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>
            of {totalElements} results
          </Typography>
        </Box>
        <ThemeProvider theme={theme}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={handleChange}
            shape="rounded"
            siblingCount={0}
            boundaryCount={1}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#333',
                border: '1px solid rgba(221, 94, 137, 0.3)',
                '&:hover': {
                  backgroundColor: '#dd5e89',
                  color: 'white',
                },
                margin: '0 2px',
                minWidth: '32px',
                height: '32px',
              },
              '& .MuiPaginationItem-ellipsis': {
                border: 'none',
              },
            }}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                }}
              />
            )}
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default CustomPagination;