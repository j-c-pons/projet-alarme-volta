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
  


  const allTimezones:allTZ = {
    "Pacific/Midway": "Midway Island, Samoa",
    "Pacific/Honolulu": "Hawaii",
    "America/Juneau": "Alaska",
    "America/Boise": "Mountain Time",
    "America/Dawson": "Dawson, Yukon",
    "America/Chihuahua": "Chihuahua, La Paz, Mazatlan",
    "America/Phoenix": "Arizona",
    "America/Chicago": "Central Time",
    "America/Regina": "Saskatchewan",
    "America/Mexico_City": "Guadalajara, Mexico City, Monterrey",
    "America/Belize": "Central America",
    "America/Detroit": "Eastern Time",
    "America/Bogota": "Bogota, Lima, Quito",
    "America/Caracas": "Caracas, La Paz",
    "America/Santiago": "Santiago",
    "America/St_Johns": "Newfoundland and Labrador",
    "America/Sao_Paulo": "Brasilia",
    "America/Tijuana": "Tijuana",
    "America/Montevideo": "Montevideo",
    "America/Argentina/Buenos_Aires": "Buenos Aires, Georgetown",
    "America/Godthab": "Greenland",
    "America/Los_Angeles": "Pacific Time",
    "Atlantic/Azores": "Azores",
    "Atlantic/Cape_Verde": "Cape Verde Islands",
    GMT: "UTC",
    "Europe/London": "Edinburgh, London",
    "Europe/Dublin": "Dublin",
    "Europe/Lisbon": "Lisbon",
    "Africa/Casablanca": "Casablanca, Monrovia",
    "Atlantic/Canary": "Canary Islands",
    "Europe/Belgrade": "Belgrade, Bratislava, Budapest, Ljubljana, Prague",
    "Europe/Sarajevo": "Sarajevo, Skopje, Warsaw, Zagreb",
    "Europe/Brussels": "Brussels, Copenhagen, Madrid, Paris",
    "Europe/Amsterdam": "Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
    "Africa/Algiers": "West Central Africa",
    "Europe/Bucharest": "Bucharest",
    "Africa/Cairo": "Cairo",
    "Europe/Helsinki": "Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
    "Europe/Athens": "Athens, Minsk",
    "Asia/Jerusalem": "Jerusalem",
    "Africa/Harare": "Harare, Pretoria",
    "Europe/Moscow": "Istanbul, Moscow, St. Petersburg, Volgograd",
    "Asia/Kuwait": "Kuwait, Riyadh",
    "Africa/Nairobi": "Nairobi",
    "Asia/Baghdad": "Baghdad",
    "Asia/Tehran": "Tehran",
    "Asia/Dubai": "Abu Dhabi, Muscat",
    "Asia/Baku": "Baku, Tbilisi, Yerevan",
    "Asia/Kabul": "Kabul",
    "Asia/Yekaterinburg": "Ekaterinburg",
    "Asia/Karachi": "Islamabad, Karachi, Tashkent",
    "Asia/Kolkata": "Chennai, Kolkata, Mumbai, New Delhi",
    "Asia/Kathmandu": "Kathmandu",
    "Asia/Dhaka": "Astana, Dhaka",
    "Asia/Colombo": "Sri Jayawardenepura",
    "Asia/Almaty": "Almaty, Novosibirsk",
    "Asia/Rangoon": "Yangon Rangoon",
    "Asia/Bangkok": "Bangkok, Hanoi, Jakarta",
    "Asia/Krasnoyarsk": "Krasnoyarsk",
    "Asia/Shanghai": "Beijing, Chongqing, Hong Kong SAR, Urumqi",
    "Asia/Kuala_Lumpur": "Kuala Lumpur, Singapore",
    "Asia/Taipei": "Taipei",
    "Australia/Perth": "Perth",
    "Asia/Irkutsk": "Irkutsk, Ulaanbaatar",
    "Asia/Seoul": "Seoul",
    "Asia/Tokyo": "Osaka, Sapporo, Tokyo",
    "Asia/Yakutsk": "Yakutsk",
    "Australia/Darwin": "Darwin",
    "Australia/Adelaide": "Adelaide",
    "Australia/Sydney": "Canberra, Melbourne, Sydney",
    "Australia/Brisbane": "Brisbane",
    "Australia/Hobart": "Hobart",
    "Asia/Vladivostok": "Vladivostok",
    "Pacific/Guam": "Guam, Port Moresby",
    "Asia/Magadan": "Magadan, Solomon Islands, New Caledonia",
    "Asia/Kamchatka": "Kamchatka, Marshall Islands",
    "Pacific/Fiji": "Fiji Islands",
    "Pacific/Auckland": "Auckland, Wellington",
    "Pacific/Tongatapu": "Nuku'alofa"
  };

export {selectSx, menuItemSx,paperSx, modalSx, allTimezones}
