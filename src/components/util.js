const domainType = ()=>{

    const backendUrl = "https://herokuapp.com";
    const __DEV__ = document.domain === 'localhost'
    const backDomain = __DEV__ ? "http://localhost:4000" : backendUrl;
    
    return backDomain;
    
    }
    
    export default domainType;