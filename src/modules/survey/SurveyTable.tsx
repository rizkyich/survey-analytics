import React, { useMemo, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

import BaseContainer from '../../components/BaseContainer'
import BaseSearchBar from '../../components/BaseSearchBar'

import { SurveyType } from '../../interfaces/survey.interfaces'

interface Column {
  id: 'title' | 'createdDate' | 'status' | 'isPublished' | 'collapse'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  format?: (value: number | string | Date) => string
}

const columns: readonly Column[] = [
  { id: 'collapse', label: '', minWidth: 30 },
  { id: 'title', label: 'Title', minWidth: 170 },
  {
    id: 'createdDate',
    label: 'Date Created',
    minWidth: 100,
    format: (value: string | Date) => {
      const date = new Date(value)

      return date.toDateString()
    },
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'isPublished',
    label: 'Published',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
]

interface SurveyTableProps {
  titleTable: string
  data: SurveyType[]
}

const SurveyTable: React.FC<SurveyTableProps> = ({ titleTable, data }) => {
  const navigate = useNavigate()

  const [searchTitle, setSearchTitle] = useState<string>('')

  const [openId, setOpenId] = useState<string | undefined>(undefined)

  const rows = useMemo(() => {
    return data
      .filter((survey: SurveyType) => {
        if (!searchTitle) return true

        return survey.title.toLowerCase().includes(searchTitle.toLowerCase())
      })
      .map((survey: SurveyType) => {
        const { id, title, createdDate, status, isPublished } = survey

        return {
          id,
          collapse: '',
          title,
          createdDate,
          status,
          isPublished: Boolean(isPublished),
        }
      })
  }, [data, searchTitle])

  return (
    <BaseContainer
      title={titleTable}
      action={
        <Button
          onClick={() => navigate('/survey/add')}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          New Survey
        </Button>
      }
    >
      <div
        style={{
          margin: '1rem 0',
        }}
      >
        <BaseSearchBar
          placeholder="Search survey title..."
          onInputSearch={setSearchTitle}
        />
      </div>

      <TableContainer
        sx={{
          maxHeight: 'calc(100vh - 19rem)',
          minHeight: 'calc(100vh - 19rem)',
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            style={{
              backgroundColor: '#f5f5f5',
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: '1rem',
                    fontWeight: '600',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <React.Fragment key={row.id}>
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id]

                      if (column.id === 'collapse') {
                        return (
                          <TableCell key={column.id}>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() =>
                                setOpenId((prevState) => {
                                  if (prevState === row.id) return

                                  return row.id
                                })
                              }
                            >
                              {openId === row.id ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>
                        )
                      }

                      if (column.id === 'isPublished') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Chip
                              label={value ? 'Yes' : 'No'}
                              color={value ? 'success' : 'warning'}
                            />
                          </TableCell>
                        )
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>

                  <TableRow>
                    <TableCell
                      style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                      }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openId === row.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box
                          sx={{
                            margin: 4,
                            display: 'flex',
                            gap: '1.5rem',
                          }}
                        >
                          <Button
                            onClick={() => navigate(`/survey/${openId}`)}
                            variant="outlined"
                            color="primary"
                            startIcon={<VisibilityIcon />}
                          >
                            See Details
                          </Button>
                          <Button
                            onClick={() => navigate(`/survey/edit/${openId}`)}
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                          >
                            Edit
                          </Button>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>

        {!rows.length && (
          <Typography variant="subtitle1" align="center" mt={10}>
            No surveys available.
          </Typography>
        )}
      </TableContainer>
    </BaseContainer>
  )
}

export default SurveyTable
