

const _getRoom = async (baseUri : string, roomId : string) => {

    const fullUri = `${baseUri}/rooms/${roomId}`

    try{
        const res = await fetch(fullUri, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
           
          });

          const data = await res.json()

          return data

    }
    catch(err){

        console.log(err);

        return false

    }
}

export default _getRoom