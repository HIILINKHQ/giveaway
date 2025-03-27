

const _getRooms = async (baseUri : string) => {

    const fullUri = `${baseUri}/rooms`

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

export default _getRooms