const selectSx={
        height:35,
        width:255, 
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
            paddingTop:1,
            paddingBottom:1,
            fontSize:13,
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

const confirmBtnSx = {
  color:"red",
   textAlign:"center",
   "&:hover": { backgroundColor: '#ff000060'}
}
export {selectSx, menuItemSx,paperSx, modalSx, modalSx2, btnSx, btnSx2, confirmBtnSx}
