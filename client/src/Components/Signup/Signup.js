import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button,Typography } from '@material-ui/core'
import { GraphQLContext } from 'graphql-react'
import { useHistory } from 'react-router-dom'

const Signup = () => {

  const { handleSubmit, register, errors, getValues } = useForm()
  const history = useHistory()
  const graphql = React.useContext(GraphQLContext)

  const onSubmit = async (values) => {
    // console.log('get values: ',getValues())

    const { username, email, password} = values

    const mutation = `
      mutation($input:SignupInput){
        signup(
          input:$input
        ){
          id
          username
        }
      }
    `
    const { cacheValuePromise } = graphql.operate({
      fetchOptionsOverride: (options) => {
        options.url = "http://localhost:4000/graphql"
      },
      operation: {
        variables: { input: {username,email,password} },
        query: mutation,
      },
    })
    const { data } = await cacheValuePromise
    console.log('cache here:',cacheValue)
    // history.push(`/homepage`)
  }

  return(
    <div style={{
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
          height:'300px',
        }}
        onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          fullWidth
          name='username'
          variant="outlined" 
          label="Username"
          inputRef={register({
            required: 'Required'
          })}
        />
        <Typography color="error">
          {errors.username && errors.username.message}
        </Typography>
        <TextField 
          fullWidth
          name='email'
          variant="outlined" 
          label="Email"
          inputRef={register({
            required: 'Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address"
            }
          })}
        />
        <Typography color="error">
          {errors.email && errors.email.message}
        </Typography>
        <TextField 
          fullWidth
          name='password'
          variant="outlined" 
          label="Password"
          inputRef={register({
            required: 'Required',
            pattern: {
              value: /^[0-9A-Z]\w{3,14}$/i,
              message: "password must be between 4-15 characters and may only include letters, numbers, and underscores"
            }
          }
        )}
        />
        <Typography color="error">
          {errors.password && errors.password.message}
        </Typography>
        <TextField 
          fullWidth
          name='password_2'
          variant="outlined" 
          label="Confirm Password"
          inputRef={register({
            required: 'Required',
            pattern: {
            value: /^[0-9A-Z]\w{3,14}$/i,
            message: "password must be between 4-15 characters and may only include letters, numbers, and underscores"
            },
            validate: {
              passwordsMustMatch: password_2 => {
                const values = getValues()
                return values.password === password_2
              },
            },
        })}
        />
        <Typography color="error">
          {console.log(errors.password2)}
          { errors.password_2 && (() => {
            const error = errors.password_2
            if (error.type === 'passwordsMustMatch') {
              return "Passwords do not match"
            }
            return error.message
          })()}
        </Typography>
        <Button 
          type='submit' 
          variant='contained' 
          color='primary'
          style={{
            width:200
          }}>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Signup