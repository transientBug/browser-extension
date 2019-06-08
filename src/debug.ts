import debugFactoryOG from "debug";

export { debugFactoryOG };
const debugFactory: debug.IDebugger = debugFactoryOG("transientBug");

export default debugFactory;
