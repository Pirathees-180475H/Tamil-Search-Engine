export function paramProvider(type){

    if(type==="all"){
        return {"query": {"match_all": {}}}
    }

}