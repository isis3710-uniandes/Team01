import React, { Component } from 'react';

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: "",
            password: "",
            changeLogInStatus:this.props.changeLogInStatus
        };
        this.changeValue = this.changeValue.bind(this);
        this.logIn = this.logIn.bind(this);
    }
    logIn() {
        if (this.state.usuario !== "" && this.state.password !== "") {
            fetch('/users/'+this.state.usuario)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if(json[0].contrasenna===this.state.password){
                    this.state.changeLogInStatus(json[0].nombre);
                    alert("Welcome");
                }else{
                    alert("Please chek the email and the password");
                }
            });  
        } else {
            alert("Please fill all the fields");
        }
    }
    changeValue(e) {
        if (e.target.id === "usuario") {
            this.setState({
                usuario: e.target.value
            });
        } else {
            this.setState({
                password: e.target.value
            });
        }
    }
    render() {
        return (

            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Welcome Again</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <input id="usuario" type="text" placeholder="usuario" className="form-control" aria-label="usuario" aria-describedby="basic-addon1" value={this.state.usuario} onChange={this.changeValue}></input>
                        </div>
                        <div className="input-group mb-3">
                            <input id="password" placeholder="contraseña" type="password" className="form-control" aria-label="password" aria-describedby="basic-addon1" value={this.state.password} onChange={this.changeValue}></input>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.logIn} data-dismiss="modal">Log In</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIn;