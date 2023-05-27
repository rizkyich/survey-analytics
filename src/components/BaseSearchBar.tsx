import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/system'

import useDebounce from '../hooks/useDebounce'

const StyledSearchBar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'transparent',
  '& > .MuiFormControl-root': {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: 'rgba(0, 0, 0, 0.87)',
    borderRadius: '4px',
    paddingRight: theme.spacing(1),
    height: theme.spacing(5),
  },
}))

interface BaseSearchBarProps {
  placeholder?: string
  onInputSearch: (inputValue: string) => void
}

const BaseSearchBar: React.FC<BaseSearchBarProps> = ({
  placeholder,
  onInputSearch,
}) => {
  const [inputValue, setInputValue] = useState<string>('')

  const debounceValue = useDebounce(inputValue, 500)

  useEffect(() => {
    onInputSearch(debounceValue)
  }, [debounceValue, onInputSearch])

  return (
    <StyledSearchBar>
      <StyledTextField
        variant="outlined"
        placeholder={placeholder}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
      />
    </StyledSearchBar>
  )
}

export default BaseSearchBar
