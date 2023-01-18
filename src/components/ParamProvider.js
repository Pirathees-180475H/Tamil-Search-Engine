export function paramProvider(queryTerm,queryTypes=[],fieldsArray=[],intervalQueryOrder,intervalQueryGap){
    let type;

    let size=1000;

    //setQueryType
    if(queryTypes.length===0){
        type="all";
    }else{
        console.log(queryTypes)
        type=queryTypes[0];
    }

   //Search In all Context
    if(type==="all" || fieldsArray.length===0){
        return{
            "query": {
                "query_string": {
                    "query":queryTerm
                }
            },
            "size":size
        }
    }

    //Match Query
    if(type==="Match"){
      // only supports first filed
     //  let  key=`${fieldsArray[0]}.case_insensitivie_and_inflections`;
       let key=fieldsArray[0];
       console.log("Query Type-Match","field-",key)
        return {
            "query": {
            "match": {
             [key]: {
            "query": queryTerm,
                        }
                    }
                }
            }
    }

    //Match Phrase
    if(type==="Match Phrase"){
        //only supports first filed
       //  let  key=`${fieldsArray[0]}.case_insensitivie_and_inflections`;
        let key=fieldsArray[0];
        console.log("Query Type-Match Phrase","Filed",key);
        return {
            "query": {
            "match_phrase": {
             [key]: queryTerm
             }
            }
         }
    }

    //Multi Match -Most count
    if(type==="Multi Match Most Fields"){
        //Supports 2 fileds
        console.log("Query Type-Multi Match Most fiedls","Filed");

        return {
            "query": {
            "multi_match" : {
            "query": queryTerm,
            "type": "most_fields",
            "fields":fieldsArray
            }
            }
        }
    }

     //Multi Match -Most fiedls
     if(type==="Multi Match Phrase"){
        console.log("Query Type-Multi Match Phrase","Filed");

        //Supports 2 fileds
        return {
            "query": {
            "multi_match" : {
            "query": queryTerm,
            "type": "phrase",
            "fields":fieldsArray
            }
            }
        }
    }

    if(type==="Wild Card"){
        console.log("Query Type - Wild Card Fileds",fieldsArray);
        let key=fieldsArray[0];
        return {
            "query": {
            "wildcard": {
            [key]: {
            "value": queryTerm
                }
                }
             }
            }
    }

    //Interval Query
    if(type==="Interval Query"){
        console.log("Query Type - Interval Query")
        //Only supports One field
        
        let queryTerms=queryTerm.split(" ");
        queryTerms=queryTerms.filter(word => word !== "");

        let intervals=queryTerms.map(function(term){
            return {
                "match":{
                    "query":term
                }
            }
        })
        
        return {
            "query": {
            "bool": {
            "must": {
            "intervals" : {
            [fieldsArray[0]]: {
            "all_of" : {
            "ordered" : intervalQueryOrder,
            "max_gaps": parseInt(intervalQueryGap),
            "intervals" : intervals
            }
            }
            }
            }
            }
            }
            }
    }


}