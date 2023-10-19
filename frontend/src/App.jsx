import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, styled, Button } from '@mui/material';

const Component = styled(Box)`
    width: 80%;
    margin: 50px auto;
    & > h4 {
        margin-bottom: 20px;
    }
    & > div > table > thead {
        background-color: #F81D1A;
    }
    & > div > table > thead > tr > th {
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 600;
    }
    & > div > table > tbody > tr > td {
        font-size: 16px;
        color: #FFFFFF;
    }
`;


function App() {
  
  // const [ products, error, loading ] = customReactQuery('/api/v1')
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    const controller = new AbortController(); // this is for Avoiding Race Condition  
    ;(async ()=>{
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get(`/api/v1?search=${search}`,{ signal:controller.signal }) 
        setProducts(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {

        if(axios.isCancel(err)){
          console.log('Request cancelled', err.message)
          return
        }

        setError(true);
        console.log(err);
      }
  })()        
    
  //cleanup
  return ()=>{
    controller.abort();
  }

  },[search])
  
  // if(error){
  //   return <h1>Something went wrong!</h1>
  // }
  // if(loading){
  //   return <h1>Loading...</h1>
  // }

  return (
    <>
      <h1>API integration</h1>
      <input type='text' onChange={(e)=> setSearch(e.target.value)} />
      { error && (<h1>Something went wrong!</h1>)}
      { loading && (<h1>Loading...</h1>)}
      <p>No of Producst { products.length }</p>
      <Component>
            <Typography variant="h4">Users</Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>description</TableCell>
                            <TableCell>price</TableCell>
                            <TableCell>category</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell><Button variant="contained" color="error" onClick={() => removeEntry(user.id)}>Remove</Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </Component>
    </>
  )
}

export default App


// const customReactQuery = (urlPath)=>{
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(false);
//   const [loading,setLoading] = useState(false);

//   useEffect(()=>{
//     ;(async ()=>{
//       try {
//         setError(false);
//         setLoading(true);
//         const response = await axios.get(urlPath)
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(true);
//         console.log(err);
//       }
//   })()        
    
//   },[])
//   return [ products, error, loading ]
// }
