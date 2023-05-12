let devMode = true

let BASE_URL = devMode ? 'http://localhost:8000' : 'https://mysterious-ravine-02108.herokuapp.com'


const getTracking = async (tnum) => {
    let req = new Request(`${BASE_URL}/api/t?tnum=${tnum}`)
    let response = null
    $('#track-results-div').hide()

    try{
     response = await fetch(req)
    }
    catch(err){
     console.log({err})
    }

   if(response.status === 200){
     const responseJSON = await response.json()
    
     if(responseJSON?.status === 'ok'){
        console.log({responseJSON})
        if(responseJSON?.data?.tracking?.length < 1){
            alert('Tracking information not found, please try again')
        }
        else{
          //show trackings div
          let responseData = responseJSON?.data
          let htmlData = ``
         let statuses = {
            'none': "Select status", 
            'station': "ARRIVED AT STATION", 
            'hold': "ON HOLD", 
            'transit': "IN TRANSIT", 
            'delivery': "OUT FOR DELIVERY", 
            'delivered': "DELIVERED"
         }
         
                    

         for(let t of responseData?.history){
           
           htmlData += `
           <tr>
            <td>${t?.tnum}</td>
            <td>${t?.location}</td>
            <td>${statuses[t?.status]}</td>
            <td>${t?.date}</td>
            <td>${t?.remarks}</td>
           </tr>
           `
        }

        $('#tnum-display').html(responseData?.tracking?.tnum)
    $('#sname').html(responseData?.shipper?.name)
    $('#sadd').html(responseData?.shipper?.address)
    $('#sphone').html(responseData?.shipper?.phone)
    $('#rname').html(responseData?.receiver?.name)
    $('#radd').html(responseData?.receiver?.address)
    $('#rphone').html(responseData?.receiver?.phone)
    $('#stype').html(responseData?.tracking?.stype)
    $('#weight').html(`${responseData?.tracking?.weight}kg`)
    $('#origin').html(responseData?.tracking?.origin)
    $('#dest').html(responseData?.tracking?.dest)
    $('#bmode').html(responseData?.tracking?.bmode)
    $('#freight').html(`$${responseData?.tracking?.freight}`)
    $('#description').html(responseData?.tracking?.description)
    $('#tracking-status').html(responseData?.tracking?.status)
    $('#pickup-at').html(responseData?.tracking?.pickup_at)

    $('#history-tbody').html(htmlData)
          $('#description-div').hide()
          $('#track-results-div').fadeIn()
     }
   }
   else{
    alert('We could not process your request, please try again in a few minutes')
   }

}
}


const addTracking = async (fd) => {
    let req = new Request(`${BASE_URL}/api/xxx`,
    {
      method: 'POST',
      body: fd
    })

    let response = null

    try{
     response = await fetch(req)
    }
    catch(err){
     console.log({err})
    }

   if(response.status === 200){
     const responseJSON = await response.json()
     console.log({responseJSON})

     if(responseJSON?.status === 'ok'){
         alert('Tracking information added!')
         window.location.replace('yyy.html')
     }else{
      alert('Tracking information not added, please try again')
     }
   }
   else{
     const responseJSON = await response.json()
     console.log({responseJSON})
    alert('We could not process your request, please try again in a few minutes')
   }

}