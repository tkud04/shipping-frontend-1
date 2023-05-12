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

const getTrackings = async () => {
    let req = new Request(`${BASE_URL}/api/xxx`)

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
        if(responseJSON?.data.length > 0){
         let htmlData = ``
         let statuses = {
            'none': "Select status", 
            'station': "ARRIVED AT STATION", 
            'hold': "ON HOLD", 
            'transit': "IN TRANSIT", 
            'delivery': "OUT FOR DELIVERY", 
            'delivered': "DELIVERED"
         }
         
                    

         for(let t of responseJSON?.data){
            let tu = `zzz.html?xf=${t?.tnum}`
           htmlData += `
           <tr>
           <td>${t?.tnum}</td>
           <td>
                    <ul class="no-dot">
                      <li>Ship Type: ${t?.stype}</li>
                      <li>Weight: ${t?.weight}kg</li>
                      <li>Origin office: ${t?.origin}</li>
                      <li>Destination office: ${t?.dest}</li>
                    </ul>
            </td>
            <td>
                    <ul class="no-dot">
                      <li>Name: ${t?.shipper?.name}</li>
                      <li>Phone: ${t?.shipper?.phone}</li>
                      <li>Address: ${t?.shipper?.address}</li>
                    </ul>
            </td>
            <td>
                    <ul class="no-dot">
                      <li>Name: ${t?.receiver?.name}</li>
                      <li>Phone: ${t?.receiver?.phone}</li>
                      <li>Address: ${t?.receiver?.address}</li>
                    </ul>
            </td>
            <td><span class="badge bg-info">${statuses[t?.status]}</span></td>
            <td>
                    <div class="btn-group">
                      <a href="${tu}" class="btn btn-primary">View</a>
                      <a class="ru" href="#" data-xf='${t?.tnum}' class="btn btn-danger">Remove</a>
                   </div>  
            </td>
            </tr>
           `
           $('#results-tbody').html(htmlData)
         }
        }
        else{
          alert('No trackings found')
        }
     }else{
      alert('Tracking information not found, please try again')
     }
   }
   else{
     const responseJSON = await response.json()
     console.log({responseJSON})
    alert('We could not process your request, please try again in a few minutes')
   }

}

const updateResult = (dt) => {
    console.log({dt})
    $('#xf').val(dt?.tnum)
    $('#sname').val(dt?.shipper?.name)
    $('#sadd').val(dt?.shipper?.address)
    $('#sphone').val(dt?.shipper?.phone)
    $('#rname').val(dt?.receiver?.name)
    $('#radd').val(dt?.receiver?.address)
    $('#rphone').val(dt?.receiver?.phone)
    $('#stype').val(dt?.stype)
    $('#weight').val(dt?.weight)
    $('#origin').val(dt?.origin)
    $('#dest').val(dt?.dest)
    $('#bmode').val(dt?.bmode)
    $('#freight').val(dt?.freight)
    $('#description').val(dt?.description)
    $('#tracking-status').val(dt?.status)
    $('#pickup-at').val(dt?.pickup_at)
}


const adminGetTracking = async (tnum) => {
    let req = new Request(`${BASE_URL}/api/yyy?xf=${tnum}`)
    let response = null

    try{
     response = await fetch(req)
    }
    catch(err){
     console.log({err})
    }

   if(response.status === 200){
     const responseJSON = await response.json()
   
     if(responseJSON?.status === 'ok'){
        
        if(responseJSON.data.length < 1){
            alert('Tracking information not found, please try again')
        }
        else{
          //show trackings div
          let dt = responseJSON?.data
          updateResult(dt)
        }
     }else{
      alert('Tracking information not found, please try again')
     }
   }
   else{
    alert('We could not process your request, please try again in a few minutes')
   }

}
