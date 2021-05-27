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

  const RutaPrivada = ({componente, path, ...rest}) => {
    if(localStorage.getItem('usuario')){
      const usuario = JSON.parse(localStorage.getItem("usuario"))
      if(usuario.uid === firebaseUser){
        return <Router path={path} component={componente} {...rest} />
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
        <Route exact={true} path="/" component={Home} />{" "}
        <RutaPrivada path="/pokemones" component={Pokemones} />{" "}
        <Route path="/login" component={Login} />{" "}
      </Switch>{" "}
    </Router>
  ) : <div><h3 className="text-center mt-3 display-3">Cargando</h3></div>
}

export default App;
