import React, {Component} from 'react';
import './Auth.css';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import AuthContext from '../Context/Auth';
class Auth extends Component {
    static  contextType= AuthContext;
    constructor(props){
        super(props);
       this.state={
            isLogin:true,
           showPassword:true
        }
        this.emailEl=React.createRef();
        this.passwordEl=React.createRef();
        this.firstNameEl=React.createRef();
        this.lastNameEl=React.createRef()
    }
    switchHandler=()=>{
        this.setState(prevState=>{
            return {isLogin: !prevState.isLogin}
        })
    };
    passwordShow=()=>{
        this.setState(prevState=>{
            return {showPassword: !prevState.showPassword}
        })
    }
    submitHandler=(e)=>{
        e.preventDefault();
      const email= this.emailEl.current.value;
        const password= this.passwordEl.current.value;
        if(email.trim().length===0 || password.trim().length===0){
            return;
        }
        let reqBody={
            query:`
            query{
            login(email:"${email}",password:"${password}"){
                userId
                token
                tokenExpiration
                firstName
            }
            }
            `
        };
        if(!this.state.isLogin){
            const firstName=this.firstNameEl.current.value;
            const lastName=this.lastNameEl.current.value;
            reqBody={
                query:`
            mutation {
  createUser(userInput:{email:"${email}",password:"${password}",firstName:"${firstName}",lastName:"${lastName}"}){
    _id
    email
  }
}`};
        }

       fetch('http://localhost:5001/graphql',{
           method:"POST",
           body:JSON.stringify(reqBody),
           headers:{
               'Content-Type':'application/json'
           }
       }).then((res)=>{
           if(res.status!==200 ){
               console.log(res);
               throw new  Error('Something went wrong');
           }
           return res.json()
               .then((data)=>{
                  if(this.state.isLogin){
                      this.context.login(data.data.login.token,data.data.login.userId,data.data.login.tokenExpiration,data.data.login.firstName);
                  }
               })
       }).catch((err)=>console.log(err));
    };
    render() {
        return (
            <Form className="auth_form" onSubmit={this.submitHandler} >
                <div className="form">
                    {
                        !this.state.isLogin?(
                            <React.Fragment>
                            <Form.Field>
                                <label>First Name</label>
                                <input ref={this.firstNameEl} placeholder='First Name' />
                            </Form.Field>
                            <Form.Field>
                            <label>Last Name</label>
                        <input ref={this.lastNameEl} placeholder='Last Name' />
                        </Form.Field>
                            </React.Fragment>
                        ) :null
                    }
                <Form.Field>
                    <label>Email</label>
                    <input ref={this.emailEl} type="email" id="email" placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input ref={this.passwordEl} type={this.state.showPassword?"password":"text"} id="password" placeholder='Password' />

                </Form.Field>
                    <Checkbox label='Show Password' onClick={this.passwordShow} />
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                    <Button  type='button' onClick={this.switchHandler}>Switch To {this.state.isLogin?"Signup":"Login"}</Button>
                <Button  type='submit'>{!this.state.isLogin?"signup":"Login"}</Button>
                </div>
            </Form>
        );
    }
}

export default Auth;