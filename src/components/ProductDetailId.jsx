import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { NavLink } from 'react-router-dom'

export const ProductDetailId = () => {
  const location = useLocation()
  const [idToSearch, setIdToSearch] = useState('')
  const [productDetail, setProductDetail] = useState({})
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (location) {
      let idUrl = location.pathname.slice(
        location.pathname.lastIndexOf('/'),
        location.pathname.length,
      )
      setIdToSearch(idUrl.replace('/', ''))
    }
  }, [location])

  useEffect(() => {
    const searchDetailId = async () => {
      const detailId = await fetch(
        `http://localhost:8080/api/products/${idToSearch}`,
      )
      const data = await detailId.json()
      return data
    }

    if (idToSearch !== '') {
      searchDetailId().then((response) => {
        setProductDetail(response)
      })
    }
  }, [idToSearch])

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid xs={6} md={7}>
          <Item style={{ height: '95vh' }}>
            <img
              style={{ width: '90vh' }}
              src={`data: image/jpeg;base64,${productDetail.img} `}
              alt=''
            />
          </Item>
        </Grid>
        <Grid xs={6} md={5}>
          <Card
            variant='outlined'
            sx={{ maxWidth: 600, padding: 2, height: '91.5vh' }}
          >
            <Box sx={{ py: 5, px: 4 }}>
              <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                marginBottom={2}
              >
                <Typography gutterBottom variant='h3' component='div'>
                  {productDetail.name}
                </Typography>
              </Stack>
              <Typography
                color='text.primary'
                variant='h6'
                textAlign={'justify'}
                marginBottom={2}
              >
                {productDetail.detail}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant='body2'>
                <Stack
                  direction='row'
                  spacing={2}
                  justifyContent={'space-around'}
                  marginBottom={2}
                  marginTop={2}
                >
                  <Button
                    variant='contained'
                    color='success'
                    onClick={handleOpenModal}
                  >
                    {' '}
                    {/* Asigna la función para abrir el modal */}
                    Comprar
                  </Button>
                  <Typography gutterBottom variant='h4' component='div'>
                    ${productDetail.price}
                  </Typography>
                </Stack>
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            textAlign='center'
            style={{ marginBottom: '20px' }}
          >
            Seleccione metodo de pago
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant='contained' component={NavLink} to='/payment/cash'>
              Efectivo
            </Button>
            <Button
              variant='contained'
              component={NavLink}
              to='/payment/transfer'
            >
              Transferencia
            </Button>
          </div>
        </Box>
      </Modal>
    </Box>
  )
}
