interface allTZ {
    [key: string]: string;
}

const selectSx={
        height:30,
        width:150, 
        color:"red", 
        backgroundColor:"black", 
        textAlign:"center",  
        overflow:"hidden",
        // height:40,
        "& .MuiSelect-icon": {
          color: 'red',
        },
        "& .MuiList": {
          paddingTop:0, 
          paddingBottom: 0,  
          borderColor:"red"
        },
        "& .MuiPaper": {
          paddingTop:0, 
          paddingBottom: 0,  
          backgroundColor:"black",
          },
          '& > div': {
            paddingTop:1,
            paddingBottom:1,
            fontSize:11,
            border: 1.5,
          },
        
}

const menuItemSx={
    width:350, 
    color:"red", 
    backgroundColor:"black", 
    fontSize:9,
    textAlign:"center",  
    lineHeight:1,
    "&:hover": {
      backgroundColor: '#ff000060',
      overflow:"hidden",
    },
    "& .Mui-selected": {
      backgroundColor: 'red'
    },
  }

const paperSx={        
    paddingTop:0, 
    paddingBottom: 0,  
    // overflowY:"hidden !important",
    backgroundColor:"black",
    scrollbarWidth:"none",
    borderColor:"red !important"
  }

  const modalSx = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderColor:'red',
    boxShadow: 24,
    p: 4,
    background:"black",
    color:"red"
  }
  
  const modalSx2 = {
    position: 'absolute !important',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: "100% !important",
    height:"100% !important",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    // borderColor:'red',
    boxShadow: 24,
    p: 4,
    background:"#ff000095",
    color:"red"
  }
  
const btnSx = {
    borderRadius:50,
    paddingTop:1,
    paddingBottom:1,
    color:'red',
    "& .MuiToggleButton-root":{
        color: 'red',
        width:30,
        height:30,
        borderRadius:50,
        marginRight:0.5,
        marginLeft:0.5,
        fontSize:10,
    },
    "& .MuiToggleButton-root:hover":{
        borderRadius:50,
        background:"#ff000047",
    },
    "& .MuiToggleButton-root.Mui-selected":{
        color: 'black',
        background:"red",
        borderRadius:50
    },
    "& .MuiToggleButton-root.Mui-selected:hover":{
        background:"#ff000090 !important",

    }
}
const btnSx2 = {color:"black !important", backgroundColor:"red", borderRadius:1, "&:hover":{background:"#ff000095"}}


  const allTimezones:allTZ = {
    "Pacific/Honolulu": "Hawaii",
    "America/Chicago": "Central Time",
    "America/Mexico_City": "Guadalajara, Mexico City, Monterrey",
    "America/Belize": "Central America",
    "America/Detroit": "Eastern Time",
    "America/Bogota": "Bogota, Lima, Quito",
    "America/Los_Angeles": "Pacific Time",
    GMT: "UTC",
    "Europe/London": "Edinburgh, London",
    "Europe/Dublin": "Dublin",
    "Africa/Casablanca": "Casablanca, Monrovia",
    "Europe/Brussels": "Brussels, Copenhagen, Madrid, Paris",
    "Europe/Amsterdam": "Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
    "Africa/Algiers": "West Central Africa",
    "Africa/Cairo": "Cairo",
    "Europe/Moscow": "Istanbul, Moscow, St. Petersburg, Volgograd",
    "Asia/Kuwait": "Kuwait, Riyadh",
    "Africa/Nairobi": "Nairobi",
    "Asia/Bangkok": "Bangkok, Hanoi, Jakarta",
    "Asia/Shanghai": "Beijing, Chongqing, Hong Kong SAR, Urumqi",
    "Asia/Kuala_Lumpur": "Kuala Lumpur, Singapore",
    "Asia/Seoul": "Seoul",
    "Asia/Tokyo": "Osaka, Sapporo, Tokyo",
    "Australia/Sydney": "Canberra, Melbourne, Sydney",
    "Asia/Vladivostok": "Vladivostok",
    "Pacific/Fiji": "Fiji Islands",
    "Pacific/Auckland": "Auckland, Wellington",
  };

export {selectSx, menuItemSx,paperSx, modalSx, modalSx2, btnSx, btnSx2, allTimezones}
