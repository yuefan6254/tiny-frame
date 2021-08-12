const Didact = require('../packages/react/index');

/** @jsx Didact.createElement */
const container = document.getElementById("root")
function App(props){
    const [state,setState] = Didact.useState(1);
    return (
        <div>
            <h1 onClick={() => setState(c => c+1)}>count {state}</h1>
            <Child></Child>
        </div>
    )
}

function Child(){
    const [state,setState] = Didact.useState(100);
    return (
        <div>
            <h2 onClick={() => setState(c => c+1)}>child {state}</h2>
        </div>
    )
}

const element =<App/>
Didact.render(element,container)