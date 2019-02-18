import React, {Component} from 'react';
import './Auth.css';
class Auth extends Component {
    constructor(props){
        super(props);
        this.emailEl=React.createRef();
        this.passwordEl=React.createRef();
    }
    submitHandler=(e)=>{
        e.preventDefault();
      const email= this.emailEl.current.value;
        const password= this.passwordEl.current.value;
        if(email.trim().length===0 || password.trim().length===0){
            return;
        }
        const query={
            query:`
            mutation{
  createUser(userInput:{email:${email},password:${password},firstName:"sachin",lastName:"thakur"}){
    _id
    email
  }
}
            `
        };
       fetch('http://localhost:5001/graphql',{
           method:"POST",
           body:JSON.stringify(query),
           headers:{
               'Content-Type':'application/json'
           }
       })
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
                   <button type="button">Switch To signup</button>
                   <button type="submit">signup</button>

               </div>
           </form>
        );
    }
}

export default Auth;