import React, { Component } from 'react'
import LogIn from "./login/LogIn"
import Register from "./login/Register"
import UserLogo from "../imgs/usr.png"
import '../styles/navbar.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: [],
            busqueda: "",
            usuario:"" ,
            logueado:false,
            logFunc: this.props.logFunc
        }
        this.changeValue = this.changeValue.bind(this);
        this.loguear = this.loguear.bind(this);

    }
    loguear(usr) {
        this.setState({
            usuario: usr,
            logueado:true
        });
        this.state.logFunc();
    }
    componentDidMount() {
        fetch('/categories')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    categorias: json
                })
            });
    }
    changeValue(e) {
        this.setState({
            busqueda: e.target.value
        });

    }
    render() {
        return (
            <div>
            
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <a className="navbar-brand" href="/"><strong id="tutofinder">TutoFinder</strong></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Categorias
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {this.state.categorias.map((e, i) => <a className="dropdown-item" href={e.rutaFront} key={i}>{e.nombre}</a>)}
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">

                            <input id="search" className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" value={this.state.busqueda} onChange={this.changeValue}></input>
                            <button id="buscarButton" className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                        </form>
                        { this.state.logueado ? <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                <img className="img-circle" src={UserLogo} alt="Generic placeholder image" width="25" height="25"></img>
                                {this.state.usuario.nombre}</a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a href="#" className="dropdown-item">Mis Tutorias</a>
                                    <div className="dropdown-divider"></div>
                                    <a href="#" className="dropdown-item">Cerrar Sesión</a>
                                </div>
                            </li>
                        </ul>: <ul className="navbar-nav">
                            <li className="nav-item">
                                <button type="button" className="btn btn-outline-light" data-toggle="modal" data-target="#exampleModal">
                                    Log In </button>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <LogIn changeLogInStatus={this.loguear} />
                                </div>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="btn btn-outline-light" data-toggle="modal" data-target="#exampleModal2">
                                    Register </button>
                            </li>
                            <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <Register changeLogInStatus={this.loguear} />
                            </div>
                        </ul> }
                        
                        

                    </div>


                </nav>

            </div >
        )
    }
}
