import React from 'react'
import {withRouter} from 'react-router-dom'
import { Button, Form} from 'semantic-ui-react'

class Login extends React.Component{

  state={
    error: false,
    username: "",
    password: ""
  }

  login = (username, password) => {
    fetch("https://go-stamp-card-api.herokuapp.com/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(res => res.json())
    .then(resp => {
      if (resp.error){
        this.setState({error: true})
      }
      else{
        this.props.handleLogin(resp)
        this.props.history.push('/stores');
      }
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.login(this.state.username, this.state.password)
  }

  render(){
    if (this.state.error){
      alert("Invalid Login Information")
      this.props.history.push('/');
      return null
    }else{
      return(
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Username</label>
            <input placeholder='Username' name="username" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder='Password' name="password" onChange={this.handleChange}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      )
    }
  }
  
}

export default withRouter(Login)
