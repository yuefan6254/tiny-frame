const Didact = require('../packages/react/index');

/** @jsx Didact.createElement */
const container = document.getElementById("root")
function App(props){
    const [state,setState] = Didact.useState(1);
    return <h1 onClick={() => setState(c => c+1)}>count {state}</h1>
}

const element =<App/>
Didact.render(element,container)