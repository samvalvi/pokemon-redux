import React, {useState, useEffect} from "react";
import Pokemones from "./components/pokemones";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/home";
import Login from "./views/login";
import NavBar from "./components/navbar";
import { auth } from './firebase'

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    const fetchData = () =>{
      auth.onAuthStateChanged((user) => {
        if (user) {
          setFirebaseUser(user);
        } else {
          setFirebaseUser(null);
        }
      })
    }
    fetchData()
  }, []);

  const RutaPrivada = ({component, path, ...rest}) => {
    if(localStorage.getItem('usuario')){
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      if(usuario.uid === firebaseUser.uid){
        return <Route path={path} component={component} {...rest} />
      }else{
          return <Redirect to="/login" {...rest} />
      }
    }else{
      return <Redirect to="/login" {...rest} />
    }
  }

  return firebaseUser !== false ? (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />{" "}
        <RutaPrivada component={Pokemones} path="/pokemones" exact/>{" "}
        <Route path="/login" component={Login} />{" "}
      </Switch>
    </Router>
  ) : <div><h3 className="text-center mt-3 display-3">Cargando</h3></div>
}

export default App;
