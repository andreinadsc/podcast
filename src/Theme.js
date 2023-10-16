import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1B1B1B',
            secondary: '#1A1A1A',
            icons: '#5c67de'
        },
        text: {
            primary: '#fff',
            secondary: '#FFFFFF4D'
        },
    },
    typography: {
        allVariants: {
            fontFamily: ['Quicksand', 'sans-serif'].join()
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    backgroundColor: 'transparent'
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.primary,
                    fontSize: '24px',
                    fontFamily: 'Quicksand, sans-serif',
                    '&.Mui-disabled': {
                        color: '#bbb'
                    }
                })
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: ({ theme }) => ({
                    color: theme.palette.secondary,
                    fontFamily: 'Quicksand, aria-sans',
                    padding: theme.spacing(1, 1, 1, 0),
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                }),
                root: {
                    width: '100%'
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: '7px',
                    backgroundColor: 'transparent',
                    borderBottom: '1px solid #FFFFFF08',
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '17.5px',
                })
            }
        },
        MuiList: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.primary.main,
                    borderBottom: '1px solid #FFFFFF08',
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '17.5px',

                })
            }
        },
        MuiTablePagination: {
            styleOverrides: {
                toolbar: ({ theme }) => ({
                    width: '50vw',
                    color: theme.palette.text.primary
                }),
                selectIcon: ({ theme }) => ({
                    color: theme.palette.text.primary
                })
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                bar:({theme}) => ({
                    backgroundColor: theme.palette.text.primary
                })
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    ':last-child': {
                        paddingBottom: '16px'
                    }
                }
            }
        },
        MuiStack: {
            styleOverrides: {
                root: {
                    marginBottom: '0 !important',
                    '& > :not(style)': {
                        marginLeft: '0 !important'
                    }
                }
            }
        }
    }
});

export default theme;
