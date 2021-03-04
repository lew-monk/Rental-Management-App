import React from 'react'
import {Controller} from 'react-hook-form'
import Dropzone from 'react-dropzone'
import {Paper, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import CloudUpload from '@material-ui/icons/CloudUpload'
import InsertDriveFile from '@material-ui/icons/InsertDriveFile'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor: '#eee',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#333',
    padding: '10px',
    // marginTop: theme.spacing(20)
    width: '100%'
  },
  icon: {
    marginTop: theme.spacing(16),
    color: '#888',
    fontSize: '42px'
  }
}))

export const FileInput = ({name, control}) => {


  const classes = useStyles()



  return(
    <Controller 
      control = {control}
      name = {name}
      defaultValue = {[]}
      render = {({onBlur, onChange, value})=> (
        <>
          <Dropzone onDrop = {onChange}>
            {({getRootProps, getInputProps}) => (
              <Paper 
                variant = 'outlined' 
                {...getRootProps()}
                className = {classes.root}
              >
                <CloudUpload className = {classes.icon}/>
                <input {...getInputProps()} name = {name} onBlur = {onBlur}/>
                <p>Drag 'n' Drop files here</p>
              </Paper>
            )}
          </Dropzone>
          <List>
            {value.map((f, index) => {
              return(
                <ListItem>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary = {f.name} secondary = {f.size}/>
                </ListItem>
              )
            })}
          </List>
        </>
      ) }
    />
  )
}