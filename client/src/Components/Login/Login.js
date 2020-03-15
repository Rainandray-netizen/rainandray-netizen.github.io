import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button,Typography } from '@material-ui/core'
import { GraphQLContext } from 'graphql-react'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const { handleSubmit, register, errors, getValues } = useForm()
  const history = useHistory()
  const graphql = React.useContext(GraphQLContext)

  const onSubmit = async (values) => {


    const { cacheValuePromise } = graphql.operate({

      //todo add mutation

      fetchOptionsOverride: (options) => {
        options.url = "http://localhost:4000/graphql"
      },
      operation: {
        variables: { input: {username,password} },
        query: mutation,
      },
    })
  }

  return(
    <div 
      style={{
      width:500,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      <form
        style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'space-between',
          height:'200px',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          fullWidth
          name='username'
          variant="outlined" 
          label="Username"
          inputRef={register({
          required: 'Required'
          })}
        />
        <TextField 
          fullWidth
          name='password'
          variant="outlined" 
          label="Password"
          inputRef={register({
            required: 'Required'
          }
        )}
        />
        <Button
          type='submit' 
          variant='contained' 
          color='primary'
          style={{
            width:200
          }}
        >
          Log In
        </Button>
      </form>
    </div>
  )
}

export default Login