let workInProcessHook;
let isMount = true;

const fiber = {
    stateNode: App,
    memorizedState: null,
}

function schedule() {
    workInProcessHook = fiber.memorizedState;
    const app = fiber.stateNode();
    isMount = false;
    return app;
}

function useState(initialValue) {
    let hook;

    if (isMount) {
        hook = {
            memorizedState: initialValue,
            next: null,
            queue: {
                peending: null
            }
        }

        if (!fiber.memorizedState) {
            fiber.memorizedState = hook;
        } else {
            workInProcessHook.next = hook;
        }

        workInProcessHook = hook;
    } else {
        hook = workInProcessHook;
        workInProcessHook = workInProcessHook.next;
    }

    // to-do
    let baseState = hook.memorizedState;
    if (hook.queue.peending) {
        let firstUpdate = hook.queue.peending.next;
        do {
            baseState = firstUpdate.action(baseState);
            firstUpdate = firstUpdate.next;
        } while (firstUpdate != hook.queue.peending);
        hook.queue.peending = null;
    }
    hook.memorizedState = baseState;

    return [baseState, dispatchAction.bind(null, hook.queue)]
}

function dispatchAction(queue, action) {
    const update = {
        action,
        next: null
    }

    if (!queue.peending) {
        update.next = update;
    } else {
        update.next = queue.peending.next;
        queue.peending.next = update;
    }

    queue.peending = update;
    schedule();
}

function App() {
    const [num, updateNum] = useState(0);

    if(true){
        const [num1,updateNum1] = useState(1);
    }

    return {
        onClick: () => updateNum(item => item + 1),
        onClick: () => updateNum(item => item + 1)
    }
}