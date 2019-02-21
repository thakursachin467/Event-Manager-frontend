import React, {Component} from 'react';
import './Auth.css';
import AuthContext from '../Context/Auth';
class Auth extends Component {
    static  contextType= AuthContext;
    constructor(props){
        super(props);
       this.state={
            isLogin:true
        }
        this.emailEl=React.createRef();
        this.passwordEl=React.createRef();
    }
    switchHandler=()=>{
        this.setState(prevState=>{
            return {isLogin: !prevState.isLogin}
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
            reqBody={
                query:`
            mutation {
  createUser(userInput:{email:"${email}",password:"${password}",firstName:"sachin",lastName:"thakur"}){
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
               throw new  Error('Something went wrong');
           }
           return res.json()
               .then((data)=>{
                  if(this.state.isLogin){
                      this.context.login(data.data.login.token,data.data.login.userId,data.data.login.tokenExpiration,data.data.login.firstName);
                  }
               })
       }).catch((err)=>console.log(err))
    };
    render() {
        return (
           <form className="auth_form" onSubmit={this.submitHandler} >
               <div className="form">
                   <label htmlFor="email">Email</label>
                   <input ref={this.emailEl} type="email" id="email"/>

               </div>
               <div className="form">
                   <label htmlFor="password">Password</label>
                   <input ref={this.passwordEl} type="password" id="password"/>

               </div>
               <div className="formAction">
                   <button type="button" onClick={this.switchHandler}>Switch To {this.state.isLogin?"Signup":"Login"}</button>
                   <button type="submit">{!this.state.isLogin?"signup":"Login"}</button>

               </div>
           </form>
        );
    }
}

export default Auth;