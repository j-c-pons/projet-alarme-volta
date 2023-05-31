const selectSx={
        height:35,
        width:300, 
        marginBottom:4.2,
        marginTop:1.6,
        color:"red", 
        textAlign:"center",  
        overflow:"hidden",
        "&:hover": {
          backgroundColor: '#ff000020',
        },
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
          },
          '& > div': {
            paddingTop:1.4,
            paddingBottom:1,
            fontSize:18,
          },  
}

const menuItemSx={
    width:460, 
    color:"red", 
    backgroundColor:"black", 
    fontSize:15,
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
    border: '1px solid #000',
    borderColor:'red',
    boxShadow: 24,
    p: 4,
    background:"black",
    color:"red",
    outline:"none"
  }
  
  const modalSx2 = {
    position: 'absolute !important',
    width: "100% !important",
    height:"100% !important",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    background:"#ff000095",
    color:"red",
    outline:"none"
  }
  
const btnSx = {
    borderRadius:50,
    paddingTop:1,
    paddingBottom:1,
    color:'red',
    outline:"none",
    "& .MuiToggleButton-root":{
        color: 'red',
        width:30,
        height:30,
        borderRadius:50,
        marginRight:0.5,
        marginLeft:0.5,
        fontSize:12,
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

const btnSx2 = {
  color:"black !important", 
  backgroundColor:"red", 
  fontSize:20,
  // fontFamily: "clock-font",
  // fontWeight:300,
  width:300,
  height:50,
  // borderRadius:1, 
  "&:hover":{background:"#ff000095"}
}

const btnSx3 = {
  borderRadius:50,
  paddingTop:1,
  paddingBottom:1,
  color:'red',
  "& .MuiToggleButton-root":{
      color: 'red',
      width:40,
      height:40,
      borderRadius:50,
      marginRight:0.5,
      marginLeft:0.5,
      fontSize:20,
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

const confirmBtnSx = {
  color:"red",
   textAlign:"center",
   "&:hover": { backgroundColor: '#ff000060'}
}

export {selectSx, menuItemSx,paperSx, modalSx, modalSx2, btnSx, btnSx2, btnSx3, confirmBtnSx}
